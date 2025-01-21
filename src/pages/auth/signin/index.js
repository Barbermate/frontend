const form = document.getElementById("wf-form-Login-Form");
const errorContainer = document.querySelector(".error_message-container");
const errorMessageElement = document.getElementById("error-message-barbershop");

if (form && form.tagName === "FORM") {
  form.addEventListener("submit", async function (event) {
    try {
      event.preventDefault(); // Prevent the default submission behavior

      const formData = new FormData(form); // Create a FormData object
      const url = `${BASE_URL}/auth/signin`;

      // Reset error message visibility
      if (errorContainer) errorContainer.style.display = "none"; // Hide the container
      if (errorMessageElement) errorMessageElement.textContent = ""; // Clear previous error message

      // Send the form data to the backend
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // If response status is not OK, handle the error
        const errorData = await response.json();
        const backendErrorMessage = errorData.error || errorData.message;

        // Display the backend error message if it exists, otherwise show the custom message
        if (errorMessageElement) {
          errorMessageElement.textContent =
            backendErrorMessage ||
            "An unexpected error occurred. Please try again later.";
        }

        if (errorContainer) errorContainer.style.display = "block"; // Show the container
        return; // Stop further processing
      }

      const data = await response.json(); // Parse the response as JSON

      if (data.token) {
        setCookie("authToken", data.token,30 * 24 * 60 * 60);

        // Redirect the user to the desired page
        window.location.href = "https://barbermate-v2.webflow.io/";
      } else {
        console.error("Token not found in response:", data);
        alert("An error occurred. Redirecting...");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      if (errorMessageElement) {
        errorMessageElement.textContent =
          "An unexpected error occurred. Please try again later.";
      }
      if (errorContainer) errorContainer.style.display = "block"; // Show the container
    }
  });

  console.log("Custom submission handler added to 'wf-form-Login-Form'.");
} else {
  console.error(
    "Form with ID 'wf-form-Login-Form' not found or is not a valid form element."
  );
}
