import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISALES {
    bill: number;
    createdAt: string;
    createdBy: string;
    customerId: string;
    customerName: string;
    deletedAt: any;
    deletedBy: any;
    dueDate: string;
    expeditionId: string;
    id: string;
    invoice: string;
    isPaidOff: boolean;
    notes: string;
    receipt: string;
    reference: string;
    saleProducts: any;
    salesType: string;
    shippingCostPerKg: number;
    shippingDate: string;
    storeId: number;
    taxPrice: number;
    totalBill: number
    totalProduct: number;
    totalQty: number;
    transactionDate: string;
    updatedAt: any;
    updatedBy: any;
}

const SalesDataSlice = createSlice({
  name: "SALES_DATA",
  initialState: {
    data: {} as ISALES,
  },
  reducers: {
    setSalesData(state, action: PayloadAction<any>) {
      state.data = action.payload.data;
    },
  },
});

export const { setSalesData } = SalesDataSlice.actions;
export const SalesData = SalesDataSlice.reducer;