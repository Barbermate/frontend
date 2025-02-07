import {
  getItemFromSessionStorage,
  addItemToSessionStorage,
} from "../services/sessionStorage/sessionStorage.service";

export let notfications = JSON.parse(
  getItemFromSessionStorage("notifications")
);

export function updateNotifications(data) {
  notfications = data;
  addItemToSessionStorage("notifications", JSON.stringify(notfications));
}

export function addNotification(notification) {
  notfications.push(notification);
  addItemToSessionStorage("notifications", JSON.stringify(notfications));
}
