export function addItemToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function removeItemFromLocalStorage(key) {
  localStorage.removeItem(key);
}
