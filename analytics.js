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

  const anonymousId = storedId(localStorage, anonymousIdKey);

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

  window.irAnalytics = Object.freeze({ capture });

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
  queuedCaptures.forEach((args) => capture(...args));
})();
