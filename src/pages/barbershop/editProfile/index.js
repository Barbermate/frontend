const authToken = getCookie("authToken");

if (!authToken) {
  // Redirect to login if no token is found
  window.location.href = "https://barbermate-v2.webflow.io/login";
} else {
  // Define the backend URL
  const BACKEND_URL = `${BASE_URL}/barbershop/profile/update`;


  // rest of the code
}