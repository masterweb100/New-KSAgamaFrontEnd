import { AxiosNormal } from "../utils/interceptors";
import QueryString from "qs";

export function HTTPGetUsers(param: {
  page: string;
  limit: string;
  q: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`users`, {
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

export function HTTPGetUserID(param: { id: number }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`users/${param.id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPAddUser(param: {
  username: string;
  storeId: number;
  getId: string;
  name: string;
  roleId: number;
  status: string;
  password: string;
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post("users", {
        username: param.username,
        storeId: param.storeId,
        getId: param.getId,
        name: param.name,
        roleId: param.roleId,
        status: param.status,
        password: param.password,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPUpdateUser(param: {
  id: number;
  storeId: number;
  roleId: number;
  name: string;
  status: boolean;
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).put(`users/${param.id}`, {
        storeId: param.storeId,
        roleId: param.roleId,
        name: param.name,
        status: param.status,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPDeleteUsers(param: { 
    ids: any[];
    token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).get(`users`, {
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
