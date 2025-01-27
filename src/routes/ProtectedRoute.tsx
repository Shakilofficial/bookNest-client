import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role?: string; // role is now optional to allow public access routes as well
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const user = verifyToken(token);
      if (role && user?.role !== role) {
        dispatch(logout());
        return <Navigate to="/auth/login" replace={true} />;
      }
      setIsLoading(false); // Once user is validated or logged out, stop loading
    } else {
      setIsLoading(false); // If no token, stop loading
    }
  }, [token, dispatch, role]);

  if (isLoading) {
    return <div>Loading...</div>; // Optionally, you can add a loading spinner
  }

  if (!token) {
    dispatch(logout());
    return <Navigate to="/auth/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
