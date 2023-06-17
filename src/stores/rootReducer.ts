import { combineReducers } from "@reduxjs/toolkit";
import { UsersData } from "./reduxes/user";
import { StoresData } from "./reduxes/store";
import { RolesData } from "./reduxes/role";
import { UserPermissions } from "./reduxes/userPermissions";
import { OpnamesData } from "./reduxes/opname";

const rootReducer = combineReducers({
  userData: UsersData,
  storeData: StoresData,
  roleData: RolesData,
  userPermissions: UserPermissions,
  OpnamesData: OpnamesData,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
