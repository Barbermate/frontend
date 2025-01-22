// Loop through all forms on the page
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  // Define additional fields to validate if they exist in this form
  const fileUploadInput = form.querySelector("#avatar");
  const positionRadios = form.querySelectorAll('input[name="position"]'); // Radio buttons for Position
  const descriptionInput = form.querySelector("#description");
  const submitButton = form.querySelector(".form_submit-button");

  // File upload validation settings
  const maxFileSize = 3 * 1024 * 1024; // 3MB
  const allowedFileTypes = ["image/jpeg", "image/png"];
  const minDescriptionLength = 50; // Minimum character count for the description

  // Function to validate inputs for this specific form
  function validateInputs() {
    // Check if the file is valid (if file input exists)
    let isFileValid = true;
    if (fileUploadInput.files) {
      const file = fileUploadInput.files[0];
      if (file) {
        // Validate file type and size
        isFileValid =
          allowedFileTypes.includes(file.type) && file.size <= maxFileSize;
      } else {
        // If no file is selected, set validation as false
        isFileValid = false;
      }
    }

    // Check if any position radio button is selected
    const isPositionValid = Array.from(positionRadios).some(
      (radio) => radio.checked
    );
    // Check if description is filled out and has at least 50 characters
    const isDescriptionValid =
      descriptionInput &&
      descriptionInput.value.trim().length >= minDescriptionLength;

    // Enable or disable the button based on validation for this form
    if (isFileValid && isPositionValid && isDescriptionValid) {
      submitButton.disabled = false;
      submitButton.classList.remove("disabled"); // Remove "disabled" combo class
      form.canSubmit = true; // Custom flag to track if the form can be submitted
    } else {
      submitButton.disabled = true;
      submitButton.classList.add("disabled"); // Add "disabled" combo class
      form.canSubmit = false; // Prevent form submission
    }
  }

  // Add event listeners for real-time validation for this form
  if (fileUploadInput)
    fileUploadInput.addEventListener("change", validateInputs);
  if (descriptionInput)
    descriptionInput.addEventListener("input", validateInputs);

  // Add event listeners for radio buttons (Position group)
  positionRadios.forEach((radio) => {
    radio.addEventListener("change", validateInputs);
  });

  // Prevent form submission if validations fail
  form.addEventListener("submit", function (event) {
    if (!form.canSubmit) {
      event.preventDefault(); // Stop the form from submitting
      console.error("Form submission prevented due to validation errors.");
      alert(
        "Please ensure all fields are filled out correctly. The description must be at least 50 characters."
      ); // Show user-friendly message
    }
  });

  // Override the form.submit method to prevent bypassing validation
  const originalSubmit = form.submit; // Save the original submit method
  form.submit = function () {
    if (form.canSubmit) {
      // Only call the original submit method if validations pass
      originalSubmit.call(form);
    } else {
      console.error(
        "Programmatic form submission prevented due to validation errors."
      );
    }
  };

  // Initial validation check for this form
  validateInputs();
});
