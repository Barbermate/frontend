const authCookie = getCookie("authToken");

if (authCookie && !userData) {
  getUserData();
}
