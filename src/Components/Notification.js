import React from "react";
function showNotification(text) {
  const notification = document.querySelector(".js-notification");
  const notificationText = document.querySelector(".js-notification-content");
  notification.classList.add("notification--active");
  notificationText.innerText = `Продукт  успішно ${text}!`;
  setTimeout(() => notification.classList.remove("notification--active"), 3000);
  return (
    <div class="notification js-notification">
      <div class="notification__close js-notification-close">
        <span></span>
        <span></span>
      </div>
      <div class="notification__content js-notification-content">
        <p>Some text</p>
      </div>
    </div>
  );
}
export default Notification;
showNotification("додано");
