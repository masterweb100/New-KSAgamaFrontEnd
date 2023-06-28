import QueryString from "qs";
import { AxiosNormal } from "../../../utils/interceptors";

export interface AddSales {
  token: string;
  customerId: string;
  invoice: string;
  transactionDate: string;
  dueDate: string;
  reference: string;
  shippingDate: string;
  salesType: string;
  expeditionId: string;
  shippingCostPerKg: number;
  receipt: string;
  notes: string;
  saleProducts: SaleProduct[];
}

export interface SaleProduct {
  productUnitId: number;
  productUnitType: string;
  qty: number;
  isPPN: boolean;
  discount1: number;
  discount2: number;
  discount3: number;
  discount4: number;
}


const uri = 'sales';
export function HTTPGenerateSalesID(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`${uri}/id`);
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPGetSales(param: {
  token: string;
  page: string;
  limit: string;
  q: any;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).get(uri, {
        params: {
          page: param.page,
          limit: param.limit,
          q: param.q,
        },
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPGetSalesByID(param: {
  token: string;
  id: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).get(`${uri}/${param.id}`);
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPAddSales(param: AddSales): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(uri, {
        customerId: param.customerId,
        invoice: param.invoice,
        transactionDate: param.transactionDate,
        dueDate: param.dueDate,
        reference: param.reference,
        shippingDate: param.shippingDate,
        salesType: param.salesType,
        expeditionId: param.expeditionId,
        shippingCostPerKg: param.shippingCostPerKg,
        receipt: param.receipt,
        notes: param.notes,
        saleProducts: param.saleProducts
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPPaySales(param: {
  token: string
  saleId: string,
  method: string,
  totalPayment: number,
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(
        `${uri}/pay`,
        {
          saleId: param.saleId,
          method: param.method,
          totalPayment: param.totalPayment,
        }
      );
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPUpdateSales(param: {
  categoryName: string;
  id: string;
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).put(
        `${uri}/${param.id}`,
        {
          categoryName: param.categoryName,
        }
      );
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPDeleteSales(param: {
  ids: any[];
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).delete(uri, {
        params: {
          ids: param.ids,
        },
        paramsSerializer: {
          serialize: (params: any) => {
            let newParams = QueryString.stringify(params, {
              encodeValuesOnly: true,
              arrayFormat: "brackets",
            });
            return newParams.replace(/[\[\]']+/g, "");
          },
        },
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}
