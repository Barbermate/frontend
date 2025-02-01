const authToken = getCookie("authToken");

if (!authToken) {
  // Redirect to login if no token is found
  window.location.href = "https://barbermate-v2.webflow.io/login";
} else if (!userData) {
  const subscriber = userDataSubject.subscribe((data) => {
    if (data && data.accountType === "barber") {
      history.back();
    }

    subscriber.unsubscribe();
  });
} else if(userData.accountType !== "barbershop") {
  history.back();
}
