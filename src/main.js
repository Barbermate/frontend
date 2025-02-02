import { getCookie } from "./services/cookie/cookie.service";
import { userData } from "./store/user.store";
import { getUserData } from "./services/user/user.service";

const authCookie = getCookie("authToken");

if (authCookie && !userData) {
  getUserData();
}
