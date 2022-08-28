import { notification } from 'antd';

const openNotificationWithIcon = (type, title, msg) => {
  notification[type]({
    message: title,
    description: msg
  });
};

export default openNotificationWithIcon;
