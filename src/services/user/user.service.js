function updateUserProfile(profile) {
  userDataState.next({ ...userData, profile });
  addItemToLocalStorage("userData", JSON.stringify(userData));
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

      updateUserProfile(data.profile);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}
