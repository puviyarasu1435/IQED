import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, Outlet, useLocation} from "react-router-dom"

const AuthLayout = () => {
    
    let location = useLocation();
    if(!true) {
        return (<Navigate to="/Auth" state={{ from: location}} replace />)
    }
 return <Outlet/>

};

export default AuthLayout;