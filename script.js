const menu = document.querySelector(".menu");
const nav = document.querySelector(".navlinks");

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

// Vercel Web Analytics is privacy-friendly and cookie-free. The project must
// have Web Analytics enabled in Vercel for page views and custom events to land.
window.va =
  window.va ||
  function (...args) {
    (window.vaq = window.vaq || []).push(args);
  };

if (
  location.protocol === "https:" &&
  location.hostname.endsWith("divebarfinder.info")
) {
  const analytics = document.createElement("script");
  analytics.defer = true;
  analytics.src = "/analytics-config.js";
  document.head.append(analytics);
}

document
  .querySelectorAll('a[href*="apps.apple.com/gb/app/dive-bar-finder"]')
  .forEach((link) => {
    link.addEventListener("click", () => {
      const source =
        link.dataset.downloadSource ||
        `${location.pathname}:${link.className || "text-link"}`;

      window.va("event", {
        name: "App Store Click",
        data: { source: source.slice(0, 120) },
      });
    });
  });
