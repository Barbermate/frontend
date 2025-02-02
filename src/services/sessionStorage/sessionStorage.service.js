export function addItemToSessionStorage(key, value) {
  sessionStorage.setItem(key, value);
}

export function getItemFromSessionStorage(key) {
  return sessionStorage.getItem(key);
}

export function removeItemFromSessionStorage(key) {
  sessionStorage.removeItem(key);
}
