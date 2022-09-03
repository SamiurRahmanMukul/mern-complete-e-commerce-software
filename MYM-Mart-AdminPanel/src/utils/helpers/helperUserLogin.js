import openNotificationWithIcon from '../common/andNotification';
import jwtEncodeUrl from './helperJwtEncoder';

const helperUserLogin = async (user) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/auth/login`;
  const token = await jwtEncodeUrl(url);

  if (token) {
    try {
      const myHeaders = new Headers();
      myHeaders.append('X_Ecommymmart', token);

      const formdata = new FormData();
      formdata.append('email', user.email);
      formdata.append('password', user.password);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const response = await fetch(`${url}?loginType=admin`, requestOptions);
      const data = await response.json();

      return {
        status: data.statusCode,
        msg: data.message,
        user: data.data || null,
        token: data.AccessToken || null
      };
    } catch (error) {
      openNotificationWithIcon('error', 'Login Error', error.message);
    }
  }
};

export default helperUserLogin;
