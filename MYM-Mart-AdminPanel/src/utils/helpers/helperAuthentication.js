/**
 * function to set session only user
 * @param {*} user user object
 */
export const setSessionUser = (user) => {
  localStorage.setItem('MYM-MART-USER', JSON.stringify(user));
};

/**
 * function to set session user and JWT access-token
 * @param {*} user user object
 * @param {*} token user JWT access-token
 */
export const setSessionUserAndToken = (user, token) => {
  localStorage.setItem('MYM-MART-USER', JSON.stringify(user));
  localStorage.setItem('MYM-MART-ACCESS-TOKEN', token);
};

/**
 * function to set session user object key against value
 * @param {*} key session user object key
 * @param {*} id session user object key's value
 */
export const setSessionUserKeyAgainstValue = (key, value) => {
  const userStr = localStorage.getItem('MYM-MART-USER');
  let userStrObj = JSON.parse(userStr);

  userStrObj = {
    ...userStrObj, [key]: value
  };

  localStorage.setItem('ERC-20-USER', JSON.stringify(userStrObj));
};

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
 * function to get session user & JWT access-token
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
 * function to removed session user, JWT access-token & cookie
 */
export const removeSessionUserTokenAndCookieToken = () => {
  localStorage.removeItem('MYM-MART-USER');
  localStorage.removeItem('MYM-MART-ACCESS-TOKEN');
  document.cookie = 'AccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
