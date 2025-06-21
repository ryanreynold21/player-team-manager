import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../types/store";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
