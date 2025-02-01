import { getCookie } from "../../../services/cookie/cookie.service";
import { userData } from "../../../store/user.store";
import { FRONTEND_SERVER_URL } from "../../../services/config/config.service";

const authToken = getCookie("authToken");
if (!authToken) {
  // Redirect to login if no token is found
  window.location.href = `${FRONTEND_SERVER_URL}login`;
} else if (!userData || userData.accountType !== "barber") {
  history.back();
} else {
  const userDataStateSubscription = userDataState.subscribe((value) => {
    if(!value){
      return;
    }
    
    const user = {
      ...value.profile
    };

    $app.createComponent('userData', user).mount('#user_wrapper');
  });
}
