import QueryString from "qs";
import { AxiosNormal } from "../../../utils/interceptors";

export interface AddPurchase {
  token: string;
  genId: string;
  supplierId: string;
  productBrandId: number;
  transactionDate: string;
  dueDate: string;
  shippingCostPerKg: number;
  purchasingProducts: PurchasingProduct[];
}

export interface PurchasingProduct {
  productUnitId: number;
  productUnitType: string;
  qty: number;
}


const uri = 'purchasing';
export function HTTPGeneratePurchaseID(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`${uri}/id`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPGetPurchases(param: {
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
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPAddPurchase(param: AddPurchase): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(uri, {
        token: param.token,
        genId: param.genId,
        supplierId: param.supplierId,
        productBrandId: param.productBrandId,
        transactionDate: param.transactionDate,
        dueDate: param.dueDate,
        shippingCostPerKg: param.shippingCostPerKg,
        purchasingProducts: param.purchasingProducts,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPPayPurchase(param: {
  token: string
  purchasingId: string,
  method: string,
  totalPayment: number,
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(
        `${uri}/pay`,
        {
          purchasingId: param.purchasingId,
          method: param.method,
          totalPayment: param.totalPayment,
        }
      );
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPUpdatePurchase(param: {
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
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPDeletePurchase(param: {
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
    } catch (error) {
      return reject(error);
    }
  });
}
