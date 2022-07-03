export const getSessionUser = () => {
  const userStr = localStorage.getItem("MYM-MART-USER");

  if (userStr) {
    return JSON.parse(userStr);
  } else {
    return null;
  }
};

export const getSessionToken = () => {
  const tokenStr = localStorage.getItem("MYM-MART-TOKEN");

  if (tokenStr) {
    return tokenStr;
  } else {
    return null;
  }
};

export const setSessionUserAndToken = (user, token) => {
  localStorage.setItem("MYM-MART-USER", JSON.stringify(user));
  localStorage.setItem("MYM-MART-TOKEN", token);
};

export const removeSessionUserTokenAndCookieToken = () => {
  localStorage.removeItem("MYM-MART-USER");
  localStorage.removeItem("MYM-MART-TOKEN");
  document.cookie = "AccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
