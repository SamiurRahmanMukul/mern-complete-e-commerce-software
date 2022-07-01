export const getSessionUser = () => {
  const userStr = localStorage.getItem("mym-mart-user");

  if (userStr) {
    return JSON.parse(userStr);
  } else {
    return null;
  }
};

export const getCookieToken = () => {
  return document.cookie || null;
};

export const setSessionUserAndCookieToken = (user, token) => {
  localStorage.setItem("mym-mart-user", JSON.stringify(user));
  document.cookie = "AccessToken=" + token;
};

export const removeSessionUserAndCookieToken = () => {
  localStorage.removeItem("mym-mart-user");
  document.cookie = "AccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};
