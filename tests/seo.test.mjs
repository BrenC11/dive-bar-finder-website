import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const canonicalOrigin = "https://divebarfinder.info";

async function htmlFiles(directory = root) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(location)));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(location);
  }

  return files.sort();
}

function oneMatch(source, expression, label, file) {
  const matches = [...source.matchAll(expression)];
  assert.equal(matches.length, 1, `${file} must have exactly one ${label}`);
  return matches[0][1].replace(/\s+/g, " ").trim();
}

function localFileFor(url) {
  const pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") return path.join(root, "index.html");
  if (pathname.endsWith("/")) return path.join(root, pathname, "index.html");
  return path.join(root, pathname);
}

test("every HTML page has unique indexable metadata and valid JSON-LD", async () => {
  const titles = new Map();
  const descriptions = new Map();
  const canonicals = new Map();

  for (const file of await htmlFiles()) {
    const relative = path.relative(root, file);
    const source = await readFile(file, "utf8");
    const title = oneMatch(source, /<title>([\s\S]*?)<\/title>/gi, "title", relative);
    const description = oneMatch(
      source,
      /<meta\s+name="description"\s+content="([^"]+)"\s*\/?>/gi,
      "meta description",
      relative,
    );
    const canonical = oneMatch(
      source,
      /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/gi,
      "canonical",
      relative,
    );

    oneMatch(source, /<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/gi, "H1", relative);
    assert.match(canonical, /^https:\/\/divebarfinder\.info\//, `${relative} canonical must use the preferred origin`);
    assert.equal(titles.has(title), false, `${relative} duplicates title from ${titles.get(title)}`);
    assert.equal(
      descriptions.has(description),
      false,
      `${relative} duplicates description from ${descriptions.get(description)}`,
    );
    assert.equal(
      canonicals.has(canonical),
      false,
      `${relative} duplicates canonical from ${canonicals.get(canonical)}`,
    );
    titles.set(title, relative);
    descriptions.set(description, relative);
    canonicals.set(canonical, relative);

    for (const match of source.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
      assert.doesNotThrow(() => JSON.parse(match[1]), `${relative} contains invalid JSON-LD`);
    }
  }
});

test("sitemap contains every canonical HTML page once", async () => {
  const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(locations).size, locations.length, "sitemap contains duplicate URLs");

  const canonicals = [];
  for (const file of await htmlFiles()) {
    const source = await readFile(file, "utf8");
    canonicals.push(oneMatch(source, /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/gi, "canonical", file));
  }

  assert.deepEqual(locations.sort(), canonicals.sort());
  for (const location of locations) {
    assert.equal(existsSync(localFileFor(new URL(location))), true, `${location} does not resolve locally`);
  }
});

test("local links and assets resolve", async () => {
  for (const file of await htmlFiles()) {
    const relative = path.relative(root, file);
    const source = await readFile(file, "utf8");
    const pageUrl = new URL(relative === "index.html" ? "/" : `/${relative}`, canonicalOrigin);

    for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const target = match[1];
      if (/^(?:https?:|mailto:|tel:|data:|#)/.test(target)) continue;
      const url = new URL(target, pageUrl);
      assert.equal(
        existsSync(localFileFor(url)),
        true,
        `${relative} links to missing local target ${target}`,
      );
    }
  }
});

test("the 54-page programmatic SEO cohort is implemented and linked from regional hubs", async () => {
  const manifest = JSON.parse(await readFile(path.join(root, "seo/page-manifest.json"), "utf8"));
  assert.equal(manifest.length, 54);
  assert.equal(new Set(manifest.map((page) => page.slug)).size, manifest.length);
  assert.equal(new Set(manifest.map((page) => page.primary_query)).size, manifest.length);

  for (const page of manifest) {
    const hub = await readFile(localFileFor(new URL(page.hub_path, canonicalOrigin)), "utf8");
    const source = await readFile(localFileFor(new URL(page.canonical_path, canonicalOrigin)), "utf8");
    assert.equal(page.page_family, "city-guide");
    assert.equal(page.indexing_decision, "index");
    assert.ok(page.evidence.length > 0);
    assert.ok(Object.keys(page.template_fields).length > 0);
    assert.equal(existsSync(localFileFor(new URL(page.canonical_path, canonicalOrigin))), true);
    assert.match(hub, new RegExp(`href="${path.basename(page.canonical_path)}"`));
    assert.match(source, /class="district-board"/);
    assert.match(source, /class="guide-faq"/);
    assert.match(source, /Getting home changes the search/);
  }
});

test("the world atlas links both regional crawl hubs", async () => {
  const hub = await readFile(path.join(root, "guides/cities.html"), "utf8");
  assert.match(hub, /href="europe\.html"/);
  assert.match(hub, /href="north-america\.html"/);
});
