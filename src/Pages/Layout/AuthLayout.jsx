import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetUserByIdQuery } from "../../Redux/RTK/AuthAPI/AuthAPI";

const AuthLayout = () => {
  const location = useLocation();
  const UserId = sessionStorage.getItem("UserId");

  // Check if the current path starts with `/quiz`
  const isQuizPath = location.pathname.startsWith("/quiz");

  // Allow access to quiz paths or require authentication for other paths
  return isQuizPath || UserId ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AuthLayout;
