const authToken = getCookie("authToken");

if (!authToken) {
  // Redirect to login if no token is found
  window.location.href = "https://barbermate-v2.webflow.io/login";
} else {
  // Define the backend URL
  const BACKEND_URL = `${BASE_URL}/barbershop/profile/update`;

  // Select the form and error elements
  const form = document.getElementById("wf-form-Complete-your-profile-Barbershop");
  const errorContainer = document.querySelector(".error_message-container");
  const errorMessageElement = document.getElementById(
    "error-message-barbershop"
  );

  if (form && form.tagName === "FORM") {
    // Add submit event listener to the form
    form.addEventListener("submit", async function (event) {
      try {
        event.preventDefault(); // Prevent the default submission behavior

        const formData = new FormData(form);

        // Reset error message visibility
        if (errorContainer) errorContainer.style.display = "none"; // Hide the container
        if (errorMessageElement) errorMessageElement.textContent = ""; // Clear previous error messag

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
          userProfile = data.profile;

          window.location.href =
            "https://barbermate-v2.webflow.io/barbershop-profile";
          return; // Stop further processing
        } else {
          // If response status is not OK, handle the error
          const errorData = await response.json();

          // Check if the backend returned an error message
          const backendErrorMessage =
            errorData.message || "An unknown error occurred.";

          // Display the backend error message
          if (errorMessageElement) {
            errorMessageElement.textContent = backendErrorMessage;
          }

          // Show the error container
          if (errorContainer) errorContainer.style.display = "block";
        }
      } catch (error) {
        // Display a generic error message if something goes wrong
        if (errorMessageElement) {
          errorMessageElement.textContent =
            "An unexpected error occurred. Please try again.";
        }

        // Show the error container
        if (errorContainer) errorContainer.style.display = "block";
      }
    });
  }
}
