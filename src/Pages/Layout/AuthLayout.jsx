import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetUserByIdQuery } from "../../Redux/RTK/AuthAPI/AuthAPI";

const AuthLayout = () => {
  const location = useLocation();
  const UserId = sessionStorage.getItem("UserId");
  const { data, error, isLoading } = useGetUserByIdQuery(UserId);
  useMemo(() => {
    console.log("Auth",data)
  }, [data]);
  
  // <Navigate to="/auth" state={{ from: location }} replace />

  return (  <Outlet /> );
};

export default AuthLayout;
