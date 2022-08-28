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
 * function to set session user and access-token
 * @param {*} user user object
 * @param {*} token user JWT access-token
 */
export const setSessionUserAndToken = (user, token) => {
  localStorage.setItem('MYM-MART-USER', JSON.stringify(user));
  localStorage.setItem('MYM-MART-ACCESS-TOKEN', token);
};

/**
 * function to removed in session user, access-token & cookie
 */
export const removeSessionUserTokenAndCookieToken = () => {
  localStorage.removeItem('MYM-MART-USER');
  localStorage.removeItem('MYM-MART-ACCESS-TOKEN');
  document.cookie = 'AccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
