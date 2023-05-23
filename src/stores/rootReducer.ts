import { combineReducers } from "@reduxjs/toolkit";
import { UsersData } from "./reduxes/user";
import { StoresData } from "./reduxes/store";
import { RolesData } from "./reduxes/role";
import { UserPermissions } from "./reduxes/userPermissions";

const rootReducer = combineReducers({
  userData: UsersData,
  storeData: StoresData,
  roleData: RolesData,
  userPermissions: UserPermissions
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
