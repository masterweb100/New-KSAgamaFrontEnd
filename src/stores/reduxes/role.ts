import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRole {
  id: number;
  genId: string;
  roleName: string;
  updatedAt: Date;
  createdAt: Date;
}

const RoleDataSlice = createSlice({
  name: "ROLE_DATA",
  initialState: {
    data: {} as IRole,
  },
  reducers: {
    setRoleData(state, action: PayloadAction<any>) {
      state.data = action.payload.data;
    },
  },
});

export const { setRoleData } = RoleDataSlice.actions;
export const RolesData = RoleDataSlice.reducer;