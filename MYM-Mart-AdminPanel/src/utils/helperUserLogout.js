import axios from "axios";
import openNotificationWithIcon from "./andNotification";
import { getSessionToken, removeSessionUserTokenAndCookieToken } from "./helperCommon";

const helperUserLogout = async () => {
  try {
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/api/v1/auth/logout",
      headers: {
        Authorization: "Bearer " + getSessionToken(),
      },
    };

    const response = await axios(config);

    if (response.data.statusCode === 200) {
      removeSessionUserTokenAndCookieToken();
      window.location.href = "/auth/login";
    } else {
      openNotificationWithIcon("error", "Logout Error", response.data.message);
      console.log("Error: ", response.data.message);
    }
  } catch (error) {
    openNotificationWithIcon("error", "Logout Error", error.message);
    console.log("Catch error: ", error);
  }
};

export default helperUserLogout;
