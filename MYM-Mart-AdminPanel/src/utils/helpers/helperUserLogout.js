import axios from 'axios';
import openNotificationWithIcon from '../common/andNotification';
import { getSessionToken, removeSessionUserTokenAndCookieToken } from './helperAuthentication';
import jwtEncodeUrl from './helperJwtEncoder';

const helperUserLogout = async () => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/auth/logout`;

  try {
    const config = {
      method: 'post',
      url,
      headers: {
        X_Ecommymmart: await jwtEncodeUrl(url),
        Authorization: `Bearer ${getSessionToken()}`
      }
    };

    const response = await axios(config);

    if (response.data.statusCode === 200) {
      removeSessionUserTokenAndCookieToken();
      window.location.href = '/auth/login';
    } else {
      openNotificationWithIcon('error', 'Logout Error', response.data.message);
    }
  } catch (error) {
    openNotificationWithIcon('error', 'Logout Error', error.message);
  }
};

export default helperUserLogout;
