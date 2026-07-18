import { writeFile } from "node:fs/promises";

const rawConfig = process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG;
let analytics = null;

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
  script.src = ${JSON.stringify(analytics.scriptSrc)};
  script.dataset.viewEndpoint = ${JSON.stringify(analytics.viewEndpoint)};
  script.dataset.eventEndpoint = ${JSON.stringify(analytics.eventEndpoint)};
  ${analytics.sessionEndpoint ? `script.dataset.sessionEndpoint = ${JSON.stringify(analytics.sessionEndpoint)};` : ""}
  document.head.append(script);
})();\n`
  : `console.warn("Vercel Web Analytics configuration is unavailable.");\n`;

await writeFile("analytics-config.js", script, "utf8");
console.log("Generated the Vercel Web Analytics loader.");
