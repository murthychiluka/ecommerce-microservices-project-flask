(function () {
  const USER_KEY = "googleStoreUser";
  const CHECK_INTERVAL_MS = 10000;
  let hasLoggedOutForDisconnect = false;

  function hasUserSession() {
    try {
      const user = JSON.parse(localStorage.getItem(USER_KEY) || "null");
      return Boolean(user && user.email);
    } catch {
      return false;
    }
  }

  function goHomeAfterBackendDisconnect() {
    if (hasLoggedOutForDisconnect) return;
    hasLoggedOutForDisconnect = true;
    localStorage.removeItem(USER_KEY);

    if (location.pathname === "/" || location.pathname.endsWith("/index.html")) {
      location.reload();
      return;
    }

    location.href = "/";
  }

  async function checkBackendConnection() {
    if (!hasUserSession()) return;

    try {
      const response = await fetch("/api", {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" }
      });
      if (!response.ok) goHomeAfterBackendDisconnect();
    } catch {
      goHomeAfterBackendDisconnect();
    }
  }

  window.addEventListener("online", checkBackendConnection);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) checkBackendConnection();
  });

  checkBackendConnection();
  setInterval(checkBackendConnection, CHECK_INTERVAL_MS);
})();
