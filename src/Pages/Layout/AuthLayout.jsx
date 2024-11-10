import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, Outlet, useLocation} from "react-router-dom"

const AuthLayout = () => {
    const location = useLocation();
    if(!sessionStorage.getItem("UserId")) {
        return (<Navigate to="/auth" state={{ from: location}} replace />)
    }
 return <Outlet/>

};

export default AuthLayout;