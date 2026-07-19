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

  setItem(key, value) {
    this.entries.set(key, String(value));
  }
}

function loadTracker({
  pathname = "/",
  referrer = "",
  localEntries,
  sessionEntries,
} = {}) {
  const requests = [];
  const listeners = new Map();
  const localStorage = new MemoryStorage(localEntries);
  const sessionStorage = new MemoryStorage(sessionEntries);
  const location = {
    origin: "http://localhost:4173",
    pathname,
  };
  let id = 0;

  const document = {
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
