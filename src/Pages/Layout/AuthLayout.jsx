import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, Outlet, useLocation} from "react-router-dom"
import { useGetUserByIdQuery } from '../../Redux/RTK/AuthAPI/AuthAPI';

const AuthLayout = () => {
    const location = useLocation();
    if(!sessionStorage.getItem("UserId")) {
        return (<Navigate to="/auth" state={{ from: location}} replace />)
    }else{
        const { data, error, isLoading } = useGetUserByIdQuery(sessionStorage.getItem("UserId"));
        console.log("Auth",data)
    }
 return <Outlet/>

};

export default AuthLayout;