import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDebt {
  id: string;
  name: string;
}

const DebtIdSlice = createSlice({
  name: "DEBT_ID",
  initialState: {
    data: {} as IDebt,
  },
  reducers: {
    setDebtId(state, action: PayloadAction<any>) {
      state.data = action.payload.data;
    },
  },
});

export const { setDebtId } = DebtIdSlice.actions;
export const DebtsData = DebtIdSlice.reducer;