import { removeSessionUserAndCookieToken } from "./helperCommon";

const helperUserLogout = async () => {
  removeSessionUserAndCookieToken();
  window.location.href = "/auth/login";
};

export default helperUserLogout;
