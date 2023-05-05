import QueryString from "qs";
import { AxiosNormal } from "../utils/interceptors";

export function HTTPGetRoles(param: {
  page: string;
  limit: string;
  q: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`roles`, {
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

export function HTTPGetRoleID(param: { id: number }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`roles/${param.id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPAddRole(param: { 
    roleName: string;
    genId: string;
    token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(`roles`, {
        roleName: param.roleName,
        genId: param.genId
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPUpdateRole(param: { 
    id: string;
    roleName: string;
    token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).put(`roles/${param.id}`, {
        roleName: param.roleName,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPDeleteRoles(param: {
  ids: any[];
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).get(`roles`, {
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
