import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const trackerSource = await readFile(
  new URL("../analytics.js", import.meta.url),
  "utf8",
);

class MemoryStorage {
  constructor(entries = {}) {
    this.entries = new Map(Object.entries(entries));
  }

  getItem(key) {
    return this.entries.get(key) ?? null;
  }

  removeItem(key) { this.entries.delete(key); }

  setItem(key, value) {
    this.entries.set(key, String(value));
  }
}

function loadTracker({
  pathname = "/",
  referrer = "",
  localEntries,
  sessionEntries,
  consent = true,
  doNotTrack,
} = {}) {
  const requests = [];
  const listeners = new Map();
  const localStorage = new MemoryStorage({ ...(consent === null ? {} : { "divebar.analyticsConsent.v1": JSON.stringify({ accepted: consent, expiresAt: Date.now() + 100000 }) }), ...localEntries });
  const sessionStorage = new MemoryStorage(sessionEntries);
  const location = {
    origin: "http://localhost:4173",
    pathname,
  };
  let id = 0;

  const element = () => ({ append() {}, setAttribute() {}, addEventListener() {}, remove() {} });
  const document = {
    body: element(),
    createElement: element,
    querySelector: () => null,
    title: "Dive Bars Near Me",
    referrer,
    addEventListener(type, listener) {
      listeners.set(type, listener);
    },
  };

  const updatePath = (url) => {
    location.pathname = new URL(url, location.origin).pathname;
  };
  const history = {
    pushState(_state, _unused, url) {
      updatePath(url);
    },
    replaceState(_state, _unused, url) {
      updatePath(url);
    },
  };
  const navigator = {
    doNotTrack,
    sendBeacon(url, body) {
      requests.push({ url, body });
      return true;
    },
  };
  const window = {};
  const addEventListener = (type, listener) => listeners.set(type, listener);
  const context = {
    Blob,
    Date,
    Number,
    Object,
    String,
    URL,
    Uint8Array,
    addEventListener,
    crypto: {
      randomUUID: () => `test-id-${++id}`,
      getRandomValues: (bytes) => bytes.fill(1),
    },
    document,
    fetch: () => Promise.resolve({ ok: true }),
    history,
    localStorage,
    location,
    navigator,
    sessionStorage,
    setTimeout,
    window,
  };

  vm.runInNewContext(trackerSource, context);

  return {
    document,
    history,
    listeners,
    localStorage,
    requests,
    runAgain: () => vm.runInNewContext(trackerSource, context),
    sessionStorage,
    window,
  };
}

const payloadAt = async (tracker, index) =>
  JSON.parse(await tracker.requests[index].body.text());

test("captures one privacy-safe page view with persistent identifiers", async () => {
  const tracker = loadTracker({
    pathname: "/guides/dive-bars-london.html",
    referrer: "https://example.com/article?campaign=secret#comments",
  });

  assert.equal(tracker.requests.length, 1);
  assert.deepEqual(await payloadAt(tracker, 0), {
    project: "dive-bar-finder",
    event: "page_view",
    path: "/guides/dive-bars-london.html",
    referrer: "https://example.com",
    anonymousId: "test-id-1",
    sessionId: "test-id-2",
    properties: { title: "Dive Bars Near Me" },
  });
  assert.equal(
    tracker.localStorage.getItem("ir_analytics_anonymous_id"),
    "test-id-1",
  );
  assert.equal(
    tracker.sessionStorage.getItem("ir_analytics_session_id"),
    "test-id-2",
  );
});

test("deduplicates page views and tracks pathname-only route changes", async () => {
  const tracker = loadTracker();

  tracker.runAgain();
  assert.equal(tracker.requests.length, 1);

  tracker.history.replaceState({}, "", "/?ignored=yes#ignored");
  await new Promise((resolve) => setTimeout(resolve, 1));
  assert.equal(tracker.requests.length, 1);

  tracker.history.pushState({}, "", "/about.html?ignored=yes#ignored");
  await new Promise((resolve) => setTimeout(resolve, 1));
  assert.equal(tracker.requests.length, 2);
  assert.equal((await payloadAt(tracker, 1)).path, "/about.html");
});

test("renews inactive sessions and normalises data-analytics clicks", async () => {
  const tracker = loadTracker({
    localEntries: { ir_analytics_anonymous_id: "returning-browser" },
    sessionEntries: {
      ir_analytics_session_id: "expired-session",
      ir_analytics_session_last_activity: String(Date.now() - 30 * 60 * 1000 - 1),
    },
  });

  assert.equal((await payloadAt(tracker, 0)).anonymousId, "returning-browser");
  assert.notEqual((await payloadAt(tracker, 0)).sessionId, "expired-session");

  tracker.listeners.get("click")({
    target: {
      closest: () => ({ dataset: { analytics: "Get The App!" } }),
    },
  });

  assert.equal((await payloadAt(tracker, 1)).event, "get_the_app");
});

test("no consent means no identifiers or network requests, including queued clicks", () => {
 const tracker = loadTracker({consent:null});
 tracker.window.irAnalytics.capture("app_store_click");
 assert.equal(tracker.requests.length,0);
 assert.equal(tracker.localStorage.getItem("ir_analytics_anonymous_id"),null);
 assert.equal(tracker.sessionStorage.getItem("ir_analytics_session_id"),null);
});
test("withdrawal stops tracking and removes identifiers",()=>{
 const tracker=loadTracker();assert.equal(tracker.requests.length,1);
 tracker.window.irAnalytics.setConsent(false);tracker.window.irAnalytics.capture("app_store_click");
 assert.equal(tracker.requests.length,1);assert.equal(tracker.localStorage.getItem("ir_analytics_anonymous_id"),null);
 tracker.window.irAnalytics.setConsent(true);assert.equal(tracker.requests.length,2);
});
test("Do Not Track overrides a saved analytics consent",()=>{
 const tracker=loadTracker({doNotTrack:"1"});assert.equal(tracker.requests.length,0);assert.equal(tracker.localStorage.getItem("ir_analytics_anonymous_id"),null);
});
