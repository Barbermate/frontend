const authToken = getCookie("authToken");

if (!authToken) {
  window.location.href = "https://barbermate-v2.webflow.io/login";
} else {
  const userDataStateSubscription = userDataState.subscribe((data) => {
    const userData = data;

    if (!userData) {
      return;
    }

    if (userData.accountType === "barber") {
      history.back();
      return;
    } else if (userData.profile.isProfileCompleted === false) {
      window.location.href =
        "https://barbermate-v2.webflow.io/complete-your-profile-as-barber";
      return;
    }

    editBarberProfile(userData);
  });

  function editBarberProfile(userData) {
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
            const radio = form.querySelector(
              `[name="${key}"][value="${userData.profile[key]}"]`
            );
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
            const data = await response.json();

            updateUserProfile(data.profile);

            window.location.href =
              "https://barbermate-v2.webflow.io/barber-profile";
            return; // Stop further processing
          } else {
            const errorData = await response.json();

            showErrorMessage(errorData.message);
          }
        } catch (error) {
          showErrorMessage();
        } finally {
          userDataStateSubscription.unsubscribe();
        }
      });
    }
  }
}
