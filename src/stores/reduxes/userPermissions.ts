import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const UserPermissionsSlice = createSlice({
  name: "USER_PERMISSIONS",
  initialState: {
    data: {} as any,
  },
  reducers: {
    setUserPermissions(state, action: PayloadAction<any>) {
      state.data = action.payload.data;
    },
  },
});

export const { setUserPermissions } = UserPermissionsSlice.actions;
export const UserPermissions = UserPermissionsSlice.reducer;
