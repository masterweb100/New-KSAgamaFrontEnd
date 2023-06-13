import QueryString from "qs";
import { AxiosNormal } from "../../../utils/interceptors";

const uri = "product-brands";
export function HTTPGenerateBrandID(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`${uri}/id`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPGetBrands(param: {
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

export function HTTPAddBrand(param: {
  brandName: string;
  genId: string;
  token: string;
  productCategoryId: number;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(uri, {
        brandName: param.brandName,
        genId: param.genId,
        productCategoryId: param.productCategoryId
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPUpdateBrand(param: {
  brandName: string;
  id: string;
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).put(
        `${uri}/${param.id}`,
        {
          brandName: param.brandName,
        }
      );
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPDeleteBrand(param: {
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