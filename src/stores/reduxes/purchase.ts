import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPurchase {
    bill: number;
    createdAt: string;
    createdBy: string;
    deletedAt: any;
    deletedBy: any;
    dueDate: string;
    genId: string;
    id: string;
    isPaidOff: boolean;
    productBrandId: number;
    productBrandName: string;
    productCategoryId: number;
    productCategoryName: string;
    purchasingStatus: string;
    shippingCostPerKg: number;
    storeId: number;
    supplierId: string;
    supplierName: string;
    totalBill: number;
    totalProduct: number;
    totalQty: number;
    transactionDate: string;
    updatedAt: any;
    updatedBy: any;
}

const PurchasesDataSlice = createSlice({
    name: "PURCHASE_DATA",
    initialState: {
        data: {} as IPurchase,
    },
    reducers: {
        setPurchasesData(state, action: PayloadAction<any>) {
            state.data = action.payload.data;
        },
    },
});

export const { setPurchasesData } = PurchasesDataSlice.actions;
export const PurchasesData = PurchasesDataSlice.reducer;