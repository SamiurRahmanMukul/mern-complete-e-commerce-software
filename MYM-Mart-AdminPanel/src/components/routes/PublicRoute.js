import { Navigate } from "react-router-dom";
import { getSessionToken, getSessionUser } from "../../utils/helpers/helperAuthentication";

const PublicRoute = ({ children }) => {
  const user = getSessionUser();
  const token = getSessionToken();

  if (user && token) {
    return <Navigate to="/admin" replace={true} />;
  } else {
    return children;
  }
};

export default PublicRoute;
