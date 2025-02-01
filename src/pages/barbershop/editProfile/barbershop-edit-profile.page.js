import { FRONTEND_SERVER_URL } from "../../../services/config/config.service";

const authToken = getCookie("authToken");

if (!authToken) {
  // Redirect to login if no token is found
  window.location.href = `${FRONTEND_SERVER_URL}login`;
} else {
  const userDataStateSubscription = userDataState.subscribe((data) => {
    const userData = data;

    if (!userData) {
      return;
    }

    if (userData.accountType !== "barbershop") {
      history.back();
      return;
    } else if (userData.profile.isProfileCompleted === false) {
      // Redirect to complete profile page if profile is not completed
      window.location.href =
        "https://barbermate-v2.webflow.io/complete-your-profile-as-barbershop";
      return;
    }

    editBarbershopProfile(userData);
  });
}
function editBarbershopProfile(userData) {
  const BACKEND_URL = `${BASE_URL}/barbershop/profile/update`;
  // rest of the code
}
