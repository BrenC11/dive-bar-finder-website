import { writeFile } from "node:fs/promises";

const rawConfig = process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG;
let analytics = null;
const absolutePath = (value) =>
  value && !value.startsWith("/") ? `/${value}` : value;

if (rawConfig) {
  try {
    analytics = JSON.parse(rawConfig).analytics;
  } catch {
    console.warn("Vercel analytics configuration could not be parsed.");
  }
}

const script = analytics
  ? `(() => {
  const script = document.createElement("script");
  script.defer = true;
  script.src = ${JSON.stringify(absolutePath(analytics.scriptSrc))};
  script.dataset.viewEndpoint = ${JSON.stringify(absolutePath(analytics.viewEndpoint))};
  script.dataset.eventEndpoint = ${JSON.stringify(absolutePath(analytics.eventEndpoint))};
  ${analytics.sessionEndpoint ? `script.dataset.sessionEndpoint = ${JSON.stringify(absolutePath(analytics.sessionEndpoint))};` : ""}
  document.head.append(script);
})();\n`
  : `console.warn("Vercel Web Analytics configuration is unavailable.");\n`;

await writeFile("analytics-config.js", script, "utf8");
console.log("Generated the Vercel Web Analytics loader.");
