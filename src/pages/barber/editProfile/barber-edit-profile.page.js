/*
const authToken = getCookie("authToken");

if (!authToken) {
  // Redirect to login if no token is found
  window.location.href = "https://barbermate-v2.webflow.io/login";
} else if (!userData || userData.accountType !== "barber") {
  history.back();
} else if (userData.profile.isProfileCompleted === false) {
  window.location.href = "https://barbermate-v2.webflow.io/complete-your-profile-as-barber";
} else {
  const BACKEND_URL = `${BASE_URL}/barber/profile/update`;

  // Populate form fields with userData.profile
  const form = document.getElementById("wf-form-Edit-profile-for-Barber");
  if (form && userData.profile) {
    Object.keys(userData.profile).forEach(key => {
      const field = form.querySelector(`[name="${key}"]`);
      if (field) {
        if (key === "avatar" && field.type === "file") {
          const img = document.querySelector(".profile_picture");
          if (img) {
            img.src = userData.profile[key].location;
            img.alt = "Avatar";
          }
          const fileInput = document.getElementById("avatar");
          if (fileInput) {
            const fileName = userData.profile[key].location.split('/').pop();
            fileInput.setAttribute('data-file-name', fileName);
          }
        } else if (key === "position" && field.type === "radio") {
          const radio = form.querySelector(`[name="${key}"][value="${userData.profile[key]}"]`);
          if (radio) {
            radio.checked = true;
          }
        } else if (key === "description") {
          field.value = userData.profile[key];
        } else {
          field.value = userData.profile[key];
        }
      }
    });
  }
}

*/

console.log("login page");
const authToken = getCookie("authToken");

if (!authToken) {
  window.location.href = "https://barbermate-v2.webflow.io/login";
} else if (!userData || userData.accountType !== "barber") {
  history.back();
} else if (userData.profile.isProfileCompleted === false) {
  window.location.href = "https://barbermate-v2.webflow.io/complete-your-profile-as-barber";
} else {
  const BACKEND_URL = `${BASE_URL}/barber/profile/update`;

  // Populate form fields with userData.profile
  const form = document.getElementById("wf-form-Edit-profile-for-Barber");

  if (form && userData.profile) {
    Object.keys(userData.profile).forEach((key) => {
      const field = form.querySelector(`[name="${key}"]`);
      if (field) {
        if (key === "avatar" && field.type === "file") {
          const img = document.querySelector(".profile_picture");
          if (img) {
            img.src = userData.profile[key].location;
            img.alt = "Avatar";
          }
          const fileInput = document.getElementById("avatar");
          if (fileInput) {
            const fileName = userData.profile[key].location.split("/").pop();
            fileInput.setAttribute("data-file-name", fileName);
          }
        } else if (key === "position" && field.type === "radio") {
          const radio = form.querySelector(`[name="${key}"][value="${userData.profile[key]}"]`);
          if (radio) {
            radio.checked = true;
          }
        } else {
          field.value = userData.profile[key];
        }
      }
    });
  }

  // Handle form submission
  if (form && form.tagName === "FORM") {
    form.addEventListener("submit", async function (event) {
      try {
        event.preventDefault();

        const formData = new FormData(form);

        hideErrorMessage();

        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json(); // Parse the response as JSON
          
          userData.profile = data.profile;
          userDataSubject.next(data.profile);

          console.log("Profile data stored in userData");

          window.location.href = "https://barbermate-v2.webflow.io/barber-profile";
          return; // Stop further processing
        } else {
          const errorData = await response.json();

          showErrorMessage(errorData.message);
        }
      } catch (error) {
        showErrorMessage();
      }
    });
  }
}
