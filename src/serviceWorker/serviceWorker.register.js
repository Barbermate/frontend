import { userData } from "../store/user.store";

if ("serviceWorker" in navigator && !navigator.serviceWorker.controller && userData) {
  console.log("register service worker");
  try {
    await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });

    const sw = await navigator.serviceWorker.ready;
    sw.active.postMessage({ type: "INIT_SOCKET" });

    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data.type === "SOCKET_CONNECTED") {
        sw.active.postMessage({
          type: "SEND_MESSAGE",
          payload: {
            ev: "register",
            message: userData.profile.id,
          },
        });
      } else if (event.data.type === "SOCKET_MESSAGE") {
        console.log("Нов WebSocket Message:", event.data.data);
      } else if (event.data.type === "SOCKET_ERROR") {
        console.error("WebSocket Error:", event.data.error);
      }
    });
  } catch (e) {
    console.log("Service Worker error:", err);
  }
}
