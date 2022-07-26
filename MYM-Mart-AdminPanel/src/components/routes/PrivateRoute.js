import { Navigate } from "react-router-dom";
import { getSessionToken, getSessionUser } from "../../utils/helpers/helperAuthentication";

const PrivateRoute = ({ children }) => {
  const user = getSessionUser();
  const token = getSessionToken();

  if (!user && !token) {
    return <Navigate to="/auth/login" replace={true} />;
  } else {
    return children;
  }
};

export default PrivateRoute;
