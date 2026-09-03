/* =========================================================
   script.js — email copy + scroll reveal
   ========================================================= */

const MY_EMAIL = "reynaldo3sioson@gmail.com";

/* ---------- copy email ----------
   navigator.clipboard only exists in a secure context, so it works on
   HTTPS and on localhost but NOT when you open the file directly from
   Finder. The fallback shows the address so the button never dead-ends. */
function wireEmailButton(id) {
  const btn = document.getElementById(id);
  if (!btn) return;

  const original = btn.textContent;
  let resetTimer;

  btn.addEventListener("click", async () => {
    clearTimeout(resetTimer);
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(MY_EMAIL);
      btn.textContent = "Copied";
      resetTimer = setTimeout(() => { btn.textContent = original; }, 2000);
    } catch {
      // Show the address instead of failing silently.
      btn.textContent = MY_EMAIL;
      resetTimer = setTimeout(() => { btn.textContent = original; }, 6000);
    }
  });
}

/* ---------- reveal on scroll ----------
   The class that hides content is added by JS, so if this script never
   runs the page is simply fully visible. IntersectionObserver fires once
   per element instead of on every scroll event. */
function wireReveals() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("js-reveal");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);   // fire once, never reverse
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.1 });

  items.forEach(item => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", () => {
  wireEmailButton("email-btn");
  wireEmailButton("email-btn-2");
  wireReveals();
});
