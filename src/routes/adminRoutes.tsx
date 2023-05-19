import React from 'react'
import { Navigate, Outlet, } from 'react-router-dom'
import secureLocalStorage from "react-secure-storage"

const Auth = () => {
    const auth = secureLocalStorage.getItem("USERDATA") as string
    return JSON.parse(auth)
}

const AdminRoutes = () => {
    const isAuth = Auth()
    return isAuth.roleId !== 1 ? <Navigate to="/dashboard-user" /> : <Outlet />
}

export default AdminRoutes;