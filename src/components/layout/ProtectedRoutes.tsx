import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      //   return <Navigate to="/login" replace />;
      return navigate("/login");
    }
  }, [token, navigate]);

  return children;
};

export default ProtectedRoutes;
