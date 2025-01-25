const authCookie = getCookie("authToken");
const userData = JSON.parse(localStorage.getItem("userData"));

if (authCookie && !userData) {
    // fetch user data
}