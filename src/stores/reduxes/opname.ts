import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOpname {
    id: number;
    storeId: number;
    purchasingId: string;
    purchasingGenId: string;
    productUnitId: number;
    productUnitGenId: string;
    productUnitType: string;
    productBrandId: number;
    productBrandName: string;
    productCategoryId: number;
    productCategoryName: string;
    productTypeId: number;
    productTypeName: string;
    qty: number;
    price: number;
    totalPrice: number;
    status: string;
    updatedBy: string;
    updatedAt: Date;
    createdBy: string;
    createdAt: Date;
    deletedBy: string;
    deletedAt: Date;
}

const OpnameDataSlice = createSlice({
    name: "OPNAME_DATA",
    initialState: {
        data: {} as IOpname,
    },
    reducers: {
        setOpnameData(state, action: PayloadAction<any>) {
            state.data = action.payload.data;
        },
    },
});

export const { setOpnameData } = OpnameDataSlice.actions;
export const OpnamesData = OpnameDataSlice.reducer;