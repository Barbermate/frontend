// Select the input element with the name "fileUpload"
const fileInput = document.querySelector('input[name="avatar"]');
const profilePicture = document.querySelector(".profile_picture"); // Select the image element with the class "profile_picture"
const fileUploadButton = document.querySelector(".file_upload-button");

// Define the maximum file size (3MB in bytes)
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB = 3 * 1024 * 1024 bytes
const SUPPORTED_FILE_TYPES = ["image/png", "image/jpeg"]; // Supported file types

// Define the default image URL
const DEFAULT_IMAGE_SRC =
  "https://cdn.prod.website-files.com/677ce96ba2c2e7985240debd/677ce96ca2c2e7985240dfcf_image.svg"; // Replace with the path to your default image

// Check if the input element exists before modifying it
if (fileInput) {
  // Change the input type to 'file'
  fileInput.setAttribute("type", "file");

  // Handle file selection
  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0]; // Get the selected file

    // Check if a file was selected
    if (file) {
      // Check if the file type is supported
      if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
        alert("Only PNG and JPEG files are allowed.");
        fileInput.value = ""; // Clear the input
        return;
      }

      // Check if the file size is within the limit
      if (file.size > MAX_FILE_SIZE) {
        alert("The file is too large. Please select a file smaller than 3MB.");
        fileInput.value = ""; // Clear the input
        return;
      }

      // If the file is valid, display it in the profile_picture element
      const reader = new FileReader();

      // When the file is read successfully, display it in the profile_picture element
      reader.onload = function (e) {
        profilePicture.src = e.target.result; // Set the src of the image to the file data URL
      };

      // Read the selected file as a data URL (for displaying image)
      reader.readAsDataURL(file);
    } else {
      alert("No file selected.");
      profilePicture.src = DEFAULT_IMAGE_SRC; // Reset to the default image
    }
  });
} else {
  console.error('Input element with name "fileUpload" not found.');
}


// Function to choose file on click of the image
if (profilePicture && fileUploadButton) {
  profilePicture.addEventListener("click", function () {
    fileUploadButton.click(); // Trigger a click on the file upload button
  });
}