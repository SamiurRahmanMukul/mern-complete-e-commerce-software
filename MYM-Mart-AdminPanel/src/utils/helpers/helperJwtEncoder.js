import axios from "axios";
import openNotificationWithIcon from "../common/andNotification";

const jwtEncodeUrl = async (getUrl) => {
  try {
    let data = JSON.stringify({
      url: getUrl,
      jwtSecret: process.env.REACT_APP_JWT_SECRET_KEY,
    });

    let config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/auth/token",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    return response.data.jwtToken || null;
  } catch (error) {
    openNotificationWithIcon("error", "Fetch Error", error.message);
    console.log("Catch error: ", error);
  }
};

export default jwtEncodeUrl;
