import { Navigate, useLocation } from "react-router-dom";
import Useauth from "../store/Useauth";

const ProtectedRoute = ({ children }) => {
  const { authStatus, hasHydrated } = Useauth((state) => ({
    authStatus: state.authStatus,
    hasHydrated: state.hasHydrated,
  }));

  const location = useLocation();

  if (!hasHydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!authStatus) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  return children;
};

export default ProtectedRoute;