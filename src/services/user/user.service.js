import { BASE_URL } from "../config/config.service";
import { getCookie } from "../cookie/cookie.service";
import { updateUserData } from "../../store/user.store";

export async function getUserData() {
  try {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("authToken")}`,
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
