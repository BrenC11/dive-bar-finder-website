const menu = document.querySelector(".menu");
const nav = document.querySelector(".navlinks");

if (!window.__insaneRabbitAnalyticsLoaderInstalled) {
  window.__insaneRabbitAnalyticsLoaderInstalled = true;
  window.irAnalytics =
    window.irAnalytics ||
    {
      queue: [],
      capture(...args) {
        this.queue.push(args);
      },
    };
  const analytics = document.createElement("script");
  const currentScript = document.currentScript;
  analytics.src = currentScript
    ? new URL("analytics.js", currentScript.src).href
    : "/analytics.js";
  analytics.async = true;
  analytics.dataset.insaneRabbitAnalytics = "true";
  document.head.append(analytics);
}

menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".navlinks a").forEach((link) =>
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  }),
);

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    }),
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));
document
  .querySelectorAll("[data-year]")
  .forEach((element) => (element.textContent = new Date().getFullYear()));

document
  .querySelectorAll('a[href*="apps.apple.com/gb/app/dive-bar-finder"]')
  .forEach((link) => {
    link.addEventListener("click", () => {
      window.irAnalytics?.capture("app_store_click", {
        source: link.dataset.downloadSource || "website",
      });
    });
  });
