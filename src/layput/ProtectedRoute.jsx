
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user} = useSelector((state) => state.user);

  return user?._id ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
