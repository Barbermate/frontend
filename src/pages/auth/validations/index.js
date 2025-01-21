// Loop through all forms on the page
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  // Select elements specific to this form
  const emailInput = form.querySelector("[name='email']");
  const passwordInput = form.querySelector("[name='password']");
  const termsCheckbox = form.querySelector("#checkbox-agreement"); // Terms of Use checkbox
  const submitButton = form.querySelector(".form_submit-button");

  // Define additional fields to validate if they exist in this form
  const nameBarbershopInput = form.querySelector("#name");
  const firstNameInput = form.querySelector("#firstName");
  const lastNameInput = form.querySelector("#lastName");

  // Define validation patterns
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?':{}|<>]{8,}$/;

  // Function to validate inputs for this specific form
  function validateInputs() {
    try {
      const isEmailValid = emailInput && emailPattern.test(emailInput.value);
      const isPasswordValid =
        passwordInput && passwordPattern.test(passwordInput.value);
      const isTermsAccepted = termsCheckbox ? termsCheckbox.checked : true; // Checkbox is optional

      // Check if additional fields are present and populated
      const isNameBarbershopValid =
        !nameBarbershopInput || nameBarbershopInput.value.trim() !== "";
      const isFirstNameValid =
        !firstNameInput || firstNameInput.value.trim() !== "";
      const isLastNameValid =
        !lastNameInput || lastNameInput.value.trim() !== "";

      // Enable or disable the button based on validation for this form
      if (
        isEmailValid &&
        isPasswordValid &&
        isTermsAccepted &&
        isNameBarbershopValid &&
        isFirstNameValid &&
        isLastNameValid
      ) {
        submitButton.disabled = false;
        submitButton.classList.remove("disabled"); // Remove "disabled" combo class
        form.canSubmit = true; // Custom flag to track if the form can be submitted
      } else {
        submitButton.disabled = true;
        submitButton.classList.add("disabled"); // Add "disabled" combo class
        form.canSubmit = false; // Prevent form submission
      }
    } catch (e) {}
  }

  // Add event listeners for real-time validation for this form
  if (emailInput) emailInput.addEventListener("input", validateInputs);
  if (passwordInput) passwordInput.addEventListener("input", validateInputs);
  if (termsCheckbox) termsCheckbox.addEventListener("change", validateInputs);

  // Add listeners for additional fields if they exist in this form
  if (nameBarbershopInput)
    nameBarbershopInput.addEventListener("input", validateInputs);
  if (firstNameInput) firstNameInput.addEventListener("input", validateInputs);
  if (lastNameInput) lastNameInput.addEventListener("input", validateInputs);

  // Prevent form submission if validations fail
  form.addEventListener("submit", function (event) {
    if (!form.canSubmit) {
      event.preventDefault(); // Stop the form from submitting
      console.error("Form submission prevented due to validation errors.");
      alert(
        "Please ensure all fields are filled out correctly and accept the Terms of Use."
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
