import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  genId: string;
  name: string;
  username: string;
  email: string;
  storeId: any;
  roleId: any;
  password: string;
  status: boolean;
  updatedAt: Date;
  createdAt: Date;
}


const UserDataSlice = createSlice({
  name: "USER_DATA",
  initialState: {
    data: {} as IUser,
  },
  reducers: {
    setUserData(state, action: PayloadAction<any>) {
      state.data = action.payload.data;
    },
  },
});

export const { setUserData } = UserDataSlice.actions;
export const UsersData = UserDataSlice.reducer;