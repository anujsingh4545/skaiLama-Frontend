import { useSelector } from "react-redux";
import { Navigate, useLocation} from "react-router-dom";

const PublicOnlyRoute = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.user);
  const location = useLocation();

  return !user?._id ? children : <Navigate to="/" replace />;
};

export default PublicOnlyRoute;
