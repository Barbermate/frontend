import { BASE_URL } from "../../../../services/config/config.service";
import { setCookie } from "../../../../services/cookie/cookie.service";
import { showErrorMessage } from "../../../../services/error/error.service";
import { hideErrorMessage } from "../../../../services/error/error.service";
import { updateUserData } from "../../../../store/user.store";
import { FRONTEND_SERVER_URL } from "../../../../services/config/config.service";

const form = document.getElementById("wf-form-Sign-up-for-Barbershop");

if (form && form.tagName === "FORM") {
  form.addEventListener("submit", async function (event) {
    try {
      event.preventDefault(); // Prevent the default submission behavior

      const formData = new FormData(form); // Create a FormData object
      const formObject = {};

      // Convert FormData to a plain object
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      const url = `${BASE_URL}/auth/signup/barbershop`;

      hideErrorMessage(); // Hide the error message if it is displayed

      // Send the form data to the backend as JSON
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });

      if (!response.ok) {
        const errorData = await response.json();

        showErrorMessage(errorData.message);

        return;
      }

      const data = await response.json(); // Parse the response as JSON

      if (data.token) {
        setCookie("authToken", data.token, 30 * 24 * 60 * 60);
        updateUserData({
          profile: data.profile,
          accountType: data.accountType,
        });
        // Redirect the user to the desired page
        window.location.href = `${FRONTEND_SERVER_URL}barbershop-profile`;
      } else {
        console.error("Token not found in response:", data);
        alert("An error occurred. Redirecting...");
      }
    } catch (error) {
      showErrorMessage();
    }
  });
} else {
  console.error(
    "Form with ID 'wf-form-Sign-up-for-Barbershop' not found or is not a valid form element."
  );
}
