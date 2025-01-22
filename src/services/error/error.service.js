function showErrorMessage(text) {
  const errorContainer = document.querySelector(".error_message-container");
  const errorMessageElement = document.getElementById(
    "error-message-barbershop"
  );

  // Display the backend error message if it exists, otherwise show the custom message
  if (errorMessageElement) {
    errorMessageElement.textContent =
      text || "An unexpected error occurred. Please try again later.";
  }

  if (errorContainer) errorContainer.style.display = "block"; // Show the container
}
