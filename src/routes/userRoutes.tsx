import React from 'react'
import { Navigate, Outlet,  } from 'react-router-dom'
import secureLocalStorage from "react-secure-storage"

const Auth = () => {
    const auth = secureLocalStorage.getItem("USER_DATA") as string
    return JSON.parse(auth)
}

const UserRoutes = () => {
    const isAuth = Auth()
    return isAuth.roleId === 1 ? <Navigate to="/dashboard" /> : <Outlet />
}

export default UserRoutes;