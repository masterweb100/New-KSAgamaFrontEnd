import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/login/login";
import Dashboard from "../pages/SuperAdmin/dashboard/dashboard";

import DataUser from "../pages/SuperAdmin/dataUser/user";
import UserForm from "../pages/SuperAdmin/dataUser/userForm";

import DataStore from "../pages/SuperAdmin/dataStore/store";
import StoreForm from "../pages/SuperAdmin/dataStore/storeForm";

import DataRole from "../pages/SuperAdmin/roleUser/role";
import RoleForm from "../pages/SuperAdmin/roleUser/roleForm";

import DataBank from "../pages/SuperAdmin/dataBank/dataBank";
import AccessUser from "../pages/SuperAdmin/accessUser/access";

const PageRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/user-data" element={<DataUser />} />
                <Route path="/user-data/form-user" element={<UserForm />} />
                <Route path="/store-data" element={<DataStore />} />
                <Route path="/store-data/form-store" element={<StoreForm />} />
                <Route path="/user-role" element={<DataRole />} />
                <Route path="/user-role/form-role" element={<RoleForm />} />
                <Route path="/user-access" element={<AccessUser />} />
                <Route path="/bank-data" element={<DataBank />} />
            </Routes>
        </Router>
    )
}

export default PageRouter;