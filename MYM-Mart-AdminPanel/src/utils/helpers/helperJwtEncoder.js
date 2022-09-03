import axios from 'axios';
import openNotificationWithIcon from '../common/andNotification';

const jwtEncodeUrl = async (getUrl) => {
  try {
    const data = JSON.stringify({
      url: getUrl,
      jwtSecret: process.env.REACT_APP_JWT_SECRET_KEY
    });

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/auth/token`,
      headers: { 'Content-Type': 'application/json' },
      data
    };

    const response = await axios(config);
    return response.data.jwtToken || null;
  } catch (error) {
    openNotificationWithIcon('error', 'Fetch Error', error.message);
  }
};

export default jwtEncodeUrl;
