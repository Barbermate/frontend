import { FRONTEND_SERVER_URL } from "../../../services/config/config.service";

const authToken = getCookie("authToken");

if (!authToken) {
  // Redirect to login if no token is found
  window.location.href = `${FRONTEND_SERVER_URL}login`;
} else if (!userData) {
  const subscriber = userDataSubject.subscribe((data) => {
    if (data && data.accountType === "barber") {
      history.back();
    }

    subscriber.unsubscribe();
  });
} else if (userData.accountType !== "barbershop") {
  history.back();
}
