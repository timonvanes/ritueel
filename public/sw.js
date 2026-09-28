self.addEventListener("push", function (event) {
  var data = { title: "Ritueel", body: "Vergeet het niet" };
  try {
    if (event.data) data = event.data.json();
  } catch (e) {}

  event.waitUntil(
    self.registration.showNotification(data.title || "Ritueel", {
      body: data.body || "Vergeet het niet",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: "ritueel-reminder"
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if ("focus" in list[i]) return list[i].focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow("/");
    })
  );
});
