import jwtEncodeUrl from "./helperJwtEncoder";

const helperUserLogin = async (user) => {
  const url = process.env.REACT_APP_API_BASE_URL + "/api/v1/auth/login?loginType=admin";
  const token = await jwtEncodeUrl(url);

  if (token) {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);

      var formdata = new FormData();
      formdata.append("email", user.email);
      formdata.append("password", user.password);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);
      const data = await response.json();

      return {
        status: data.statusCode,
        msg: data.message,
        user: data.data || null,
        token: data.AccessToken || null,
      };
    } catch (error) {
      console.log("Catch error: ", error);
    }
  }
};

export default helperUserLogin;
