import { BASE_URL } from "../../../services/config/config.service";
import { getCookie } from "../../../services/cookie/cookie.service";
import {
  hideErrorMessage,
  showErrorMessage,
} from "../../../services/error/error.service";
import { updateUserProfile } from "../../../store/user.store";

const authToken = getCookie("authToken");

if (!authToken) {
  // Redirect to login if no token is found
  window.location.href = "https://barbermate-v2.webflow.io/login";
} else {
  // Define the backend URL
  const BACKEND_URL = `${BASE_URL}/barber/profile/update`;

  // Select the form and error elements
  const form = document.getElementById("wf-form-Complete-your-profile");

  if (form && form.tagName === "FORM") {
    // Add submit event listener to the form
    form.addEventListener("submit", async function (event) {
      try {
        event.preventDefault(); // Prevent the default submission behavior

        const formData = new FormData(form);

        hideErrorMessage(); // Hide the error message if it is displayed

        // Send the form data to the backend with Authorization header
        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          updateUserProfile(data.profile);

          window.location.href =
            "https://barbermate-v2.webflow.io/barber-profile";
          return; // Stop further processing
        } else {
          // If response status is not OK, handle the error
          const errorData = await response.json();

          showErrorMessage(errorData.message);
        }
      } catch (error) {
        showErrorMessage();
      }
    });
  }
}
