import { userData } from "../../../store/user.store";

const user = userData.profile;
$app.createComponent("userData", user).mount("#user_wrapper");
