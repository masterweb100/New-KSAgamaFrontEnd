import QueryString from "qs";
import { AxiosNormal } from "../../../utils/interceptors";

const uri = "product-units";
export function HTTPGenerateUnitsID(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`${uri}/id`);
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPGetUnits(param: {
  token: string;
  page: string;
  limit: string;
  q: string;
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

export function HTTPGetUnitsByParent(param: {
  token: string;
  id: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).get(`${uri}/parent`, {
        params: {
          productTypeId: param.id,
        },
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPAddUnits(param: {
  token: string;
  genId: string;
  productBrandId: number;
  productTypeId: number;
  supplierId: string;
  buyPriceInPcs: number;
  sellPriceInPcs: number;
  buyPriceInDozens: number;
  sellPriceInDozens: number;
  buyPriceInBox: number;
  sellPriceInBox: number;
  accountIdForBuying: number;
  accountIdForSelling: number;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(uri, {
        genId: param.genId,
        productBrandId: param.productBrandId,
        productTypeId: param.productTypeId,
        supplierId: param.supplierId,
        buyPriceInPcs: param.buyPriceInPcs,
        sellPriceInPcs: param.sellPriceInPcs,
        buyPriceInDozens: param.buyPriceInDozens,
        sellPriceInDozens: param.sellPriceInDozens,
        buyPriceInBox: param.buyPriceInBox,
        sellPriceInBox: param.sellPriceInBox,
        accountIdForBuying: param.accountIdForBuying,
        accountIdForSelling: param.accountIdForSelling,
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPUpdateUnits(param: {
  unitId: string;
  token: string;
  buyPriceInPcs: number;
  sellPriceInPcs: number;
  buyPriceInDozens: number;
  sellPriceInDozens: number;
  buyPriceInBox: number;
  sellPriceInBox: number;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).put(
        `${uri}/${param.unitId}`,
        {
          buyPriceInPcs: param.buyPriceInPcs,
          sellPriceInPcs: param.sellPriceInPcs,
          buyPriceInDozens: param.buyPriceInDozens,
          sellPriceInDozens: param.sellPriceInDozens,
          buyPriceInBox: param.buyPriceInBox,
          sellPriceInBox: param.sellPriceInBox,
        }
      );
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPDeleteUnits(param: {
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
