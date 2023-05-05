import QueryString from "qs";
import { AxiosNormal } from "../utils/interceptors";

export function HTTPGetStores(param: {
  page: string;
  limit: string;
  q: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`stores`, {
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

export function HTTPGetStoreID(param: { id: number }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`stores/${param.id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPAddStore(param: {
  storeName: string;
  genId: string;
  address: string;
  adminId: string;
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(`stores`, {
        storeName: param.storeName,
        genId: param.genId,
        address: param.address,
        adminId: param.adminId
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPUpdateStore(param: {
  id: string;
  storeName: string;
  adminId: string;
  address: string;
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).put(`stores/${param.id}`, {
          storeName: param.storeName,
          adminId: param.adminId,
          address: param.address
        }
      );
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPDeleteStores(param: {
  ids: any[];
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).get(`stores`, {
        params: {
          ids: param.ids,
        },
        paramsSerializer: {
          encode: (params: any) => {
            return QueryString.stringify(params, { encodeValuesOnly: true });
          },
        },
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}
