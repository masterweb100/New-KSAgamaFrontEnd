import React from 'react'
import { Navigate, Outlet,  } from 'react-router-dom'
import secureLocalStorage from "react-secure-storage"

const Auth = () => {
    const auth = secureLocalStorage.getItem("TOKEN")
    console.log(auth)
    return auth
}

const UserRoutes = () => {
    const isAuth = Auth()
    return isAuth === 'super' ? <Navigate to="/dashboard" /> : <Outlet />
}

export default UserRoutes;