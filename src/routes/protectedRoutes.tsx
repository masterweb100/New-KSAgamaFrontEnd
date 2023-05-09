import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import secureLocalStorage from "react-secure-storage"

const Auth = () => {
    const auth = secureLocalStorage.getItem("TOKEN")
    return auth
}

const ProtectedRoutes = () => {
    const isAuth = Auth()
    return isAuth === null ? <Navigate to="/" /> : <Outlet />
}

export default ProtectedRoutes;