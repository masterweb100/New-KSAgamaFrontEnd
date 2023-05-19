import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStore {
  id: number;
  genId: string;
  storeName: string;
  address: string;
  adminId: string;
  updatedAt: Date;
  createdAt: Date;
}

const StoreDataSlice = createSlice({
  name: "STORE_DATA",
  initialState: {
    data: {} as IStore,
  },
  reducers: {
    setStoreData(state, action: PayloadAction<any>) {
      state.data = action.payload.data;
    },
  },
});

export const { setStoreData } = StoreDataSlice.actions;
export const StoresData = StoreDataSlice.reducer;
