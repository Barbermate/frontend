function addItemToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getItemFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function removeItemFromLocalStorage(key) {
  localStorage.removeItem(key);
}
