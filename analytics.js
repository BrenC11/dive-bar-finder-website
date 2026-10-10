(() => {
  "use strict";

  if (window.__insaneRabbitAnalyticsInstalled) return;
  window.__insaneRabbitAnalyticsInstalled = true;

  const endpoint =
    "https://insane-rabbit-analytics.brendancleaves-6b1.workers.dev/v1/track";
  const project = "dive-bar-finder";
  const anonymousIdKey = "ir_analytics_anonymous_id";
  const sessionIdKey = "ir_analytics_session_id";
  const sessionActivityKey = "ir_analytics_session_last_activity";
  const sessionTimeout = 30 * 60 * 1000;
  const blockedProperty =
    /(^|_)(name|email|phone|address|password|token|auth|cookie|form|search|query|url|href|referrer|ip)($|_)/i;
  const queuedCaptures = Array.isArray(window.irAnalytics?.queue)
    ? [...window.irAnalytics.queue]
    : [];
  let lastPageViewPath = null;

  const randomId = () => {
    try {
      return crypto.randomUUID();
    } catch {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
        "",
      );
    }
  };

  const storedId = (storage, key) => {
    try {
      const existing = storage.getItem(key);
      if (existing) return existing;
      const id = randomId();
      storage.setItem(key, id);
      return id;
    } catch {
      return randomId();
    }
  };

  const consentKey = "divebar.analyticsConsent.v1";
  const consentLifetime = 180 * 24 * 60 * 60 * 1000;
  let consent = null;
  let anonymousId = null;
  let consentExpiresAt = 0;
  try {
    const saved = JSON.parse(localStorage.getItem(consentKey) || "null");
    if (saved && saved.expiresAt > Date.now()) {
      consent = saved.accepted === true;
      consentExpiresAt = saved.expiresAt;
    }
  } catch { /* Invalid preferences leave analytics off. */ }
  if (navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true) consent = false;

  const clearIdentifiers = () => {
    try { localStorage.removeItem(anonymousIdKey); } catch {}
    try { sessionStorage.removeItem(sessionIdKey); sessionStorage.removeItem(sessionActivityKey); } catch {}
    anonymousId = null;
  };
  if (consent !== true) clearIdentifiers();

  const chooseAnalytics = accepted => {
    consent = accepted === true;
    consentExpiresAt = Date.now() + consentLifetime;
    try { localStorage.setItem(consentKey, JSON.stringify({ accepted: consent, expiresAt: consentExpiresAt })); } catch {}
    if (!consent) clearIdentifiers();
    lastPageViewPath = null;
    consentPanel?.remove();
    consentPanel = null;
    if (consent) capturePageView();
  };
  let consentPanel = null;
  const showAnalyticsChoices = () => {
    if (consentPanel || !document.body) return;
    consentPanel = document.createElement("section");
    consentPanel.className = "analytics-consent";
    consentPanel.setAttribute("aria-label", "Website analytics choices");
    const text = document.createElement("p");
    text.textContent = "May we collect basic website statistics? Optional analytics help us understand which pages people use. You can change your choice at any time.";
    consentPanel.append(text);
    for (const [label, accepted] of [["Allow analytics", true], ["Keep analytics off", false]]) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", () => chooseAnalytics(accepted));
      consentPanel.append(button);
    }
    document.body.append(consentPanel);
  };

  const currentSessionId = () => {
    const now = Date.now();

    try {
      const lastActivity = Number(sessionStorage.getItem(sessionActivityKey));
      let sessionId = sessionStorage.getItem(sessionIdKey);

      if (
        !sessionId ||
        !Number.isFinite(lastActivity) ||
        now - lastActivity >= sessionTimeout
      ) {
        sessionId = randomId();
        sessionStorage.setItem(sessionIdKey, sessionId);
      }

      sessionStorage.setItem(sessionActivityKey, String(now));
      return sessionId;
    } catch {
      return randomId();
    }
  };

  const normaliseEvent = (event) =>
    String(event || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 80);

  const safeReferrer = () => {
    if (!document.referrer) return null;

    try {
      const referrer = new URL(document.referrer);
      return referrer.origin === location.origin
        ? referrer.pathname
        : referrer.origin;
    } catch {
      return null;
    }
  };

  const safeProperties = (properties) => {
    if (!properties || typeof properties !== "object" || Array.isArray(properties)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(properties)
        .filter(([key]) => !blockedProperty.test(key))
        .flatMap(([key, value]) => {
          if (typeof value === "boolean") return [[key, value]];
          if (typeof value === "number" && Number.isFinite(value)) {
            return [[key, value]];
          }
          if (typeof value !== "string") return [];

          const safeValue = value.trim().slice(0, 120);
          if (
            !safeValue ||
            /https?:\/\//i.test(safeValue) ||
            /\S+@\S+\.\S+/.test(safeValue) ||
            /[?#]/.test(safeValue)
          ) {
            return [];
          }

          return [[key, safeValue]];
        }),
    );
  };

  const send = (payload) => {
    try {
      const body = JSON.stringify(payload);

      if (
        typeof navigator.sendBeacon === "function" &&
        navigator.sendBeacon(
          endpoint,
          new Blob([body], { type: "application/json" }),
        )
      ) {
        return;
      }

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Analytics is best-effort and must never affect the website.
    }
  };

  const capture = (event, properties, value) => {
    try {
      if (consent !== true || Date.now() >= consentExpiresAt || navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true) {
        clearIdentifiers();
        return;
      }
      if (!anonymousId) anonymousId = storedId(localStorage, anonymousIdKey);
      const eventName = normaliseEvent(event);
      if (!eventName) return;

      const payload = {
        project,
        event: eventName,
        path: location.pathname,
        referrer: safeReferrer(),
        anonymousId,
        sessionId: currentSessionId(),
        properties:
          eventName === "page_view"
            ? { title: document.title }
            : safeProperties(properties),
      };

      if (typeof value === "number" && Number.isFinite(value)) {
        payload.value = value;
      }

      send(payload);
    } catch {
      // Invalid analytics input is ignored.
    }
  };

  const capturePageView = () => {
    const path = location.pathname;
    if (path === lastPageViewPath) return;
    lastPageViewPath = path;
    capture("page_view");
  };

  window.irAnalytics = Object.freeze({ capture, setConsent: chooseAnalytics, showChoices: showAnalyticsChoices });
  const choicesButton = document.createElement("button");
  choicesButton.type = "button";
  choicesButton.className = "analytics-choices";
  choicesButton.textContent = "Analytics choices";
  choicesButton.addEventListener("click", showAnalyticsChoices);
  (document.querySelector(".footer .legal") || document.body)?.append(choicesButton);
  if (consent === null) showAnalyticsChoices();

  document.addEventListener("click", (clickEvent) => {
    const element = clickEvent.target?.closest?.("[data-analytics]");
    if (!element) return;
    capture(element.dataset.analytics);
  });

  for (const method of ["pushState", "replaceState"]) {
    const original = history[method];
    if (typeof original !== "function") continue;

    history[method] = function (...args) {
      const result = original.apply(this, args);
      setTimeout(capturePageView, 0);
      return result;
    };
  }

  addEventListener("popstate", () => setTimeout(capturePageView, 0));
  capturePageView();
  if (consent === true) queuedCaptures.forEach((args) => capture(...args));
})();
