import React from 'react'
import { Navigate, Outlet, } from 'react-router-dom'
import secureLocalStorage from "react-secure-storage"

const Auth = () => {
    const auth = secureLocalStorage.getItem("TOKEN")
    console.log(auth)
    return auth
}

const AdminRoutes = () => {
    const isAuth = Auth()
    return isAuth !== 'super' ? <Navigate to="/dashboard-user" /> : <Outlet />
}

export default AdminRoutes;