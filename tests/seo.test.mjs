import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const canonicalOrigin = "https://divebarfinder.info";
const sitemapLeafFiles = [
  "sitemap-core.xml",
  "sitemap-europe.xml",
  "sitemap-north-america.xml",
  "sitemap-world.xml",
];

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

function plainText(source) {
  const entities = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };
  return source
    .replace(/<a\b[^>]*>[\s\S]*?<\/a\s*>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (_, entity) => {
      if (entity.startsWith("#x")) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
      if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
      return entities[entity.toLowerCase()] ?? `&${entity};`;
    })
    .replace(/\s+/g, " ")
    .trim();
}

function structuredDataNodes(source) {
  const nodes = [];
  for (const match of source.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    const data = JSON.parse(match[1]);
    for (const item of Array.isArray(data) ? data : [data]) {
      nodes.push(...(Array.isArray(item?.["@graph"]) ? item["@graph"] : [item]));
    }
  }
  return nodes;
}

function visibleFaq(source) {
  const answers = new Map();
  for (const match of source.matchAll(/<details\b[^>]*>[\s\S]*?<summary>([\s\S]*?)<\/summary>[\s\S]*?<(?:div|p)\s+class="answer">([\s\S]*?)<\/(?:div|p)>[\s\S]*?<\/details>/gi)) {
    answers.set(plainText(match[1]), plainText(match[2]));
  }
  const guide = source.match(/<div\s+class="guide-faq">([\s\S]*?)<\/div>/i)?.[1] ?? "";
  for (const match of guide.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi)) {
    answers.set(plainText(match[1]), plainText(match[2]));
  }
  return answers;
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

test("sitemap index, child maps and text fallback contain every canonical HTML page once", async () => {
  const sitemapIndex = await readFile(path.join(root, "sitemap.xml"), "utf8");
  assert.match(sitemapIndex, /<sitemapindex\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  const childLocations = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(
    childLocations,
    sitemapLeafFiles.map((file) => `${canonicalOrigin}/${file}`),
  );

  const locations = [];
  for (const file of sitemapLeafFiles) {
    const sitemap = await readFile(path.join(root, file), "utf8");
    assert.match(sitemap, /<urlset\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
    locations.push(...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
  }
  assert.equal(new Set(locations).size, locations.length, "child sitemaps contain duplicate URLs");

  const canonicals = [];
  for (const file of await htmlFiles()) {
    const source = await readFile(file, "utf8");
    canonicals.push(oneMatch(source, /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/gi, "canonical", file));
  }

  assert.deepEqual(locations.sort(), canonicals.sort());
  const textLocations = (await readFile(path.join(root, "sitemap.txt"), "utf8"))
    .trim()
    .split("\n");
  assert.deepEqual(textLocations.sort(), canonicals.sort());
  for (const location of locations) {
    assert.equal(existsSync(localFileFor(new URL(location))), true, `${location} does not resolve locally`);
  }
});

test("FAQ structured data exactly matches the visible questions and answers", async () => {
  for (const file of await htmlFiles()) {
    const source = await readFile(file, "utf8");
    const faqPages = structuredDataNodes(source).filter((node) => node?.["@type"] === "FAQPage");
    if (faqPages.length === 0) continue;

    const relative = path.relative(root, file);
    assert.equal(faqPages.length, 1, `${relative} must have exactly one FAQPage node`);
    const visible = visibleFaq(source);
    const structured = new Map(faqPages[0].mainEntity.map((question) => [
      plainText(question.name),
      plainText(question.acceptedAnswer?.text ?? ""),
    ]));
    assert.deepEqual(structured, visible, `${relative} FAQ schema must match visible copy`);
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
    const pageHref = `${path.basename(page.slug)}.html`;
    assert.equal(page.page_family, "city-guide");
    assert.equal(page.indexing_decision, "index");
    assert.ok(page.evidence.length > 0);
    assert.ok(Object.keys(page.template_fields).length > 0);
    assert.equal(existsSync(localFileFor(new URL(page.canonical_path, canonicalOrigin))), true);
    assert.match(hub, new RegExp(`href="${path.basename(page.canonical_path)}"`));
    assert.match(source, /class="district-board"/);
    assert.match(source, /class="guide-faq"/);
    assert.match(source, /Getting home changes the search/);
    for (const inboundPath of page.internal_links_in) {
      const inboundFile = localFileFor(new URL(`${inboundPath}.html`, canonicalOrigin));
      const inboundSource = await readFile(inboundFile, "utf8");
      assert.match(inboundSource, new RegExp(`href="${pageHref}"`));
    }
    for (const outboundPath of page.internal_links_out) {
      assert.match(source, new RegExp(`href="${path.basename(outboundPath)}\\.html"`));
    }
  }
});

test("the world atlas links both regional crawl hubs", async () => {
  const hub = await readFile(path.join(root, "guides/cities.html"), "utf8");
  assert.match(hub, /href="europe\.html"/);
  assert.match(hub, /href="north-america\.html"/);
});
