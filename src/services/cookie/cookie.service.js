function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function setCookie(key, value, duration) {
  document.cookie = `${key}=${
    value
  }; path=/; Secure; SameSite=Lax; max-age=${duration}`;
}