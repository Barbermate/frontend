import {
  getItemFromSessionStorage,
  addItemToSessionStorage,
} from "../services/sessionStorage/sessionStorage.service";

export let userData = JSON.parse(getItemFromSessionStorage("userData"));

export function updateUserData(data) {
  userData = data;
  addItemToSessionStorage("userData", JSON.stringify(userData));
}

export function updateUserProfile(profile) {
  userData.profile = profile;
  addItemToSessionStorage("userData", JSON.stringify(userData));
}
