import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { TUserDate, logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type TProtectedRoutesProps = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoutes = ({ children, role }: TProtectedRoutesProps) => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  let user;
  if (token) {
    user = jwtDecode(token);
  }

  if (role !== undefined && role !== (user as TUserDate)?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;
