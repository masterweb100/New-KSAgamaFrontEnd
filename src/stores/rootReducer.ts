import { combineReducers } from "@reduxjs/toolkit";
import { UsersData } from "./reduxes/user";
import { StoresData } from "./reduxes/store";
import { RolesData } from "./reduxes/role";
import { UserPermissions } from "./reduxes/userPermissions";
import { OpnamesData } from "./reduxes/opname";
import { SalesData } from "./reduxes/sales";
import { PurchasesData } from "./reduxes/purchase";

const rootReducer = combineReducers({
  userData: UsersData,
  storeData: StoresData,
  roleData: RolesData,
  userPermissions: UserPermissions,
  OpnamesData: OpnamesData,
  salesData: SalesData,
  purchasesData: PurchasesData,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
