const authToken = getCookie("authToken");

if (!authToken) {
  // Redirect to login if no token is found
  window.location.href = "https://barbermate-v2.webflow.io/login";
} else if (!userData || userData.accountType !== "barber") {
  history.back();
} else {
  // rest of the code
}