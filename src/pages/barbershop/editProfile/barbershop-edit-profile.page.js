import { FRONTEND_SERVER_URL } from "../../../services/config/config.service";

const authToken = getCookie("authToken");

if (!authToken) {
  // Redirect to login if no token is found
  window.location.href = `${FRONTEND_SERVER_URL}login`;
} else {
  // Define the backend URL
  const BACKEND_URL = `${BASE_URL}/barbershop/profile/update`;
  // rest of the code
}
