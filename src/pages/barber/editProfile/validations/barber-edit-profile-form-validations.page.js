/*
// Select the specific form by its ID
const form = document.querySelector("#wf-form-Edit-profile-for-Barber");

if (form) {
    // Select elements specific to this form
    const emailInput = form.querySelector("[name='email']");
    const firstNameInput = form.querySelector("#firstName");
    const lastNameInput = form.querySelector("#lastName");
    const fileUploadInput = form.querySelector("#avatar");
    const positionRadios = form.querySelectorAll('input[name="position"]'); // Radio buttons for Position
    const descriptionInput = form.querySelector("#description");
    const submitButton = form.querySelector(".form_submit-button");

    // Define validation patterns and settings
    const emailPattern = new RegExp(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    );
    const maxFileSize = 3 * 1024 * 1024; // 3MB
    const allowedFileTypes = ["image/jpeg", "image/png"];
    const minDescriptionLength = 50; // Minimum character count for the description

    // Function to validate inputs for this specific form
    function validateInputs() {
        // Validate email
        const isEmailValid = emailInput && emailPattern.test(emailInput.value);

        // Check if first name and last name are filled out
        const isFirstNameValid =
            !firstNameInput || firstNameInput.value.trim() !== "";

        const isLastNameValid = !lastNameInput || lastNameInput.value.trim() !== "";

        // Check if the file is valid (if file input exists)
        let isFileValid = true;
        if (fileUploadInput && fileUploadInput.files) {
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
        if (
            isEmailValid &&
            isFirstNameValid &&
            isLastNameValid &&
            isFileValid &&
            isPositionValid &&
            isDescriptionValid
        ) {
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
    if (emailInput) emailInput.addEventListener("input", validateInputs);
    if (firstNameInput)
        firstNameInput.addEventListener("input", validateInputs);
    if (lastNameInput) lastNameInput.addEventListener("input", validateInputs);
    if (fileUploadInput)
        fileUploadInput.addEventListener("change", validateInputs);
    if (descriptionInput)
        descriptionInput.addEventListener("input", validateInputs);
    positionRadios.forEach((radio) => {
        radio.addEventListener("change", validateInputs);
    });

    // Prevent form submission if validations fail
    form.addEventListener("submit", function (event) {
        if (!form.canSubmit) {
            event.preventDefault(); // Stop the form from submitting
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
        }
    };

    // Initial validation check for this form
    validateInputs();
}

*/


const form = document.querySelector("#wf-form-Edit-profile-for-Barber");

if (form) {
    // Select elements specific to this form
    const emailInput = form.querySelector("[name='email']");
    const firstNameInput = form.querySelector("#firstName");
    const lastNameInput = form.querySelector("#lastName");
    const fileUploadInput = form.querySelector("#avatar");
    const positionRadios = form.querySelectorAll('input[name="position"]');
    const descriptionInput = form.querySelector("#description");
    const submitButton = form.querySelector(".form_submit-button");

    // Define validation patterns and settings
    const emailPattern = new RegExp(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );
    const maxFileSize = 3 * 1024 * 1024; // 3MB
    const allowedFileTypes = ["image/jpeg", "image/png"];
    const minDescriptionLength = 50; // Minimum character count for the description

    // Store initial values to compare changes
    let initialValues = {
        email: emailInput ? emailInput.value.trim() : "",
        firstName: firstNameInput ? firstNameInput.value.trim() : "",
        lastName: lastNameInput ? lastNameInput.value.trim() : "",
        description: descriptionInput ? descriptionInput.value.trim() : "",
        position: Array.from(positionRadios).find(radio => radio.checked)?.value || "",
        fileName: fileUploadInput ? fileUploadInput.getAttribute('data-file-name') : ""
    };

    function hasChanges() {
        const trimValue = (val) => val ? val.trim() : "";
        const currentFileName = fileUploadInput ? fileUploadInput.getAttribute('data-file-name') : "";

        return (
            trimValue(emailInput.value) !== initialValues.email ||
            trimValue(firstNameInput.value) !== initialValues.firstName ||
            trimValue(lastNameInput.value) !== initialValues.lastName ||
            trimValue(descriptionInput.value) !== initialValues.description ||
            Array.from(positionRadios).some(radio => radio.checked && radio.value !== initialValues.position) ||
            (fileUploadInput && fileUploadInput.files.length > 0 && fileUploadInput.files[0].name !== initialValues.fileName) ||
            (fileUploadInput && currentFileName !== initialValues.fileName)
        );
    }

    function validateInputs() {
        // Validate email
        const isEmailValid = emailInput && emailPattern.test(emailInput.value.trim());

        // Check if first name and last name are filled out
        const isFirstNameValid = firstNameInput && firstNameInput.value.trim() !== "";
        const isLastNameValid = lastNameInput && lastNameInput.value.trim() !== "";

        // Check if the file is valid (if file input exists)
        let isFileValid = true;
        if (fileUploadInput && fileUploadInput.files.length > 0) {
            const file = fileUploadInput.files[0];
            isFileValid = allowedFileTypes.includes(file.type) && file.size <= maxFileSize;
        }

        // Remove "required" from file input if no file is selected
        if (fileUploadInput && fileUploadInput.files.length === 0) {
            fileUploadInput.removeAttribute("required");
        }

        // Check if any position radio button is selected
        const isPositionValid = Array.from(positionRadios).some(radio => radio.checked);

        // Check if description is filled out and has at least 50 characters
        const isDescriptionValid = descriptionInput && descriptionInput.value.trim().length >= minDescriptionLength;

        // Ensure that at least one field has changed
        const isChanged = hasChanges();

        // Enable or disable the button based on validation
        if (
            isEmailValid &&
            isFirstNameValid &&
            isLastNameValid &&
            isFileValid &&
            isPositionValid &&
            isDescriptionValid &&
            isChanged
        ) {
            submitButton.disabled = false;
            submitButton.classList.remove("disabled");
            form.canSubmit = true;
        } else {
            submitButton.disabled = true;
            submitButton.classList.add("disabled");
            form.canSubmit = false;
        }
    }

    // Add event listeners for real-time validation
    [emailInput, firstNameInput, lastNameInput, descriptionInput].forEach(input => {
        if (input) {
            input.addEventListener("input", () => {
                setTimeout(() => {
                    validateInputs();
                }, 0);
            });
        }
    });

    if (fileUploadInput) {
        fileUploadInput.addEventListener("change", () => {
            validateInputs();
        });
    }

    positionRadios.forEach(radio => radio.addEventListener("change", validateInputs));

    // Prevent form submission if validations fail
    form.addEventListener("submit", function (event) {
        if (!form.canSubmit) {
            event.preventDefault();
            alert("Please ensure all fields are filled out correctly and that you have made changes before submitting.");
        }
    });

    // Override the form.submit method to prevent bypassing validation
    const originalSubmit = form.submit;
    form.submit = function () {
        if (form.canSubmit) {
            originalSubmit.call(form);
        }
    };

    // Initial validation check
    validateInputs();
}

