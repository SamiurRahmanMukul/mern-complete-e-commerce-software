/**
 * function to get session user details
 * @returns if session user return user object otherwise return null
 */
export const getSessionUser = () => {
  const userStr = localStorage.getItem('MYM-Mart-User');

  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

/**
 * function to get session user access-token
 * @returns if session user return access-token otherwise return null
 */
export const getSessionToken = () => {
  const tokenStr = localStorage.getItem('MYM-Mart-Access-Token');

  if (tokenStr) {
    return tokenStr;
  }
  return null;
};

/**
 * function to set session user and JWT access-token
 * @param {*} user user object
 * @param {*} token user JWT access-token
 */
export const setSessionUserAndToken = (user, token) => {
  localStorage.setItem('MYM-Mart-User', JSON.stringify(user));
  localStorage.setItem('MYM-Mart-Access-Token', token);
};

/**
 * function to set session user
 * @param {*} user user object
 */
export const setSessionUser = (user) => {
  localStorage.setItem('MYM-Mart-User', JSON.stringify(user));
};

/**
 * function to set session user object key against value
 * @param {*} key session user object key
 * @param {*} value session user object key's value
 */
export const setSessionUserKeyAgainstValue = (key, value) => {
  const userStr = localStorage.getItem('MYM-Mart-User');
  let userStrObj = JSON.parse(userStr);

  userStrObj = {
    ...userStrObj, [key]: value
  };

  localStorage.setItem('MYM-Mart-User', JSON.stringify(userStrObj));
};

/**
 * function to removed in session user & JWT access-token
 */
export const removeSessionUserAndToken = () => {
  localStorage.removeItem('MYM-Mart-User');
  localStorage.removeItem('MYM-Mart-Access-Token');
};
