(function () {
  const FALLBACK_BASE = "https://tse1.mm.bing.net/th";

  function buildFallbackUrl(img) {
    const query = [
      img.getAttribute("alt"),
      img.closest("article")?.querySelector("h3")?.textContent,
      "product"
    ].filter(Boolean).join(" ");

    return `${FALLBACK_BASE}?q=${encodeURIComponent(query || "shopping product")}&w=600&h=400&c=7&rs=1&p=0&o=5&pid=1.7`;
  }

  document.addEventListener("error", (event) => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement)) return;
    if (img.dataset.fallbackApplied === "true") return;

    img.dataset.fallbackApplied = "true";
    img.src = buildFallbackUrl(img);
  }, true);
})();
