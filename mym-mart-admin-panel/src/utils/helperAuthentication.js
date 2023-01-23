/**
 * function to get session user details
 * @returns if session user return user object otherwise return null
 */
export const getSessionUser = () => {
  const userStr = localStorage.getItem('MYM-MART-USER');

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
  const tokenStr = localStorage.getItem('MYM-MART-ACCESS-TOKEN');

  if (tokenStr) {
    return tokenStr;
  }
  return null;
};

/**
 * function to get session user refresh-token
 * @returns if session user return refresh-token otherwise return null
 */
export const getRefreshToken = () => {
  const tokenStr = localStorage.getItem('MYM-MART-REFRESH-TOKEN');

  if (tokenStr) {
    return tokenStr;
  }
  return null;
};

/**
 * function to set session user and JWT access-token & refresh-token
 * @param {*} user user object
 * @param {*} accessToken user JWT access-token
 * @param {*} refreshToken user JWT refresh-token
 */
export const setSessionUserAndToken = (user, accessToken, refreshToken) => {
  localStorage.setItem('MYM-MART-USER', JSON.stringify(user));
  localStorage.setItem('MYM-MART-ACCESS-TOKEN', accessToken);
  localStorage.setItem('MYM-MART-REFRESH-TOKEN', refreshToken);
};

/**
 * function to set session JWT access-token & refresh-token
 * @param {*} accessToken user JWT access-token
 * @param {*} refreshToken user JWT refresh-token
 */
export const setSessionAccessAndRefreshToken = (accessToken, refreshToken) => {
  localStorage.setItem('MYM-MART-ACCESS-TOKEN', accessToken);
  localStorage.setItem('MYM-MART-REFRESH-TOKEN', refreshToken);
};

/**
 * function to set session user
 * @param {*} user user object
 */
export const setSessionUser = (user) => {
  localStorage.setItem('MYM-MART-USER', JSON.stringify(user));
};

/**
 * function to set session user object key against value
 * @param {*} key session user object key
 * @param {*} value session user object key's value
 */
export const setSessionUserKeyAgainstValue = (key, value) => {
  const userStr = localStorage.getItem('MYM-MART-USER');
  let userStrObj = JSON.parse(userStr);

  userStrObj = {
    ...userStrObj, [key]: value
  };

  localStorage.setItem('MYM-MART-USER', JSON.stringify(userStrObj));
};

/**
 * function to removed in session and logout user
 */
export const removeSessionAndLogoutUser = () => {
  localStorage.removeItem('MYM-MART-USER');
  localStorage.removeItem('MYM-MART-ACCESS-TOKEN');
  localStorage.removeItem('MYM-MART-REFRESH-TOKEN');
  window.location.href = '/auth/login';
};
