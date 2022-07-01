import axios from "axios";

const jwtEncodeUrl = async (getUrl) => {
  try {
    var data = JSON.stringify({
      url: getUrl,
      jwtSecret: process.env.REACT_APP_JWT_SECRET_KEY,
    });

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/api/v1/auth/token",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    return response.data.jwtToken || null;
  } catch (error) {
    console.log("Catch error: ", error);
  }
};

export default jwtEncodeUrl;
