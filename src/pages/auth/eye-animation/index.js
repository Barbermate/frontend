// Select the password field and the eye button
const passwordField = document.querySelector("[name='password']");
const eyeButton = document.querySelector(".password_eye-button");

// Define the image URLs for the eye states
const eyeOpenURL = "https://cdn.prod.website-files.com/677ce96ba2c2e7985240debd/678a1daa493b948cc5a2e709_PhEyeSlash.svg";
const eyeClosedURL = "https://cdn.prod.website-files.com/677ce96ba2c2e7985240debd/678a1db39b2c0d08e9d2e9ef_PhEye.svg"; // Adjust this if you have a different URL for the "closed" eye

// Add click event listener to the eye button
if (passwordField && eyeButton) {
    eyeButton.addEventListener("click", function () {
        // Toggle the password field type between "password" and "text"
        if (passwordField.type === "password") {
            passwordField.type = "text";
            eyeButton.src = eyeOpenURL; // Change to the "eye open" image
        } else {
            passwordField.type = "password";
            eyeButton.src = eyeClosedURL; // Change to the "eye closed" image
        }
    });
}