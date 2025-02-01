function updateUserProfile(profile) {
  userData.profile = profile;
  userDataState.next({ ...userData });
  addItemToLocalStorage("userData", JSON.stringify(userData));
}

function updateUserData(data) {
  userData = data;
  userDataState.next(data);
  addItemToLocalStorage("userData", JSON.stringify(data));
}

async function getUserData() {
  try {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCookie}`,
      },
    });

    if (response.ok) {
      const data = await response.json(); // Parse the response as JSON
      updateUserData(data);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}
