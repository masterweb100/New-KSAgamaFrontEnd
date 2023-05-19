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

export function HTTPGenerateUserID(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`users/id`);
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
  genId: string;
  name: string;
  roleId: number;
  status: boolean;
  email: string;
  password: string;
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post("users", {
        username: param.username,
        storeId: param.storeId,
        genId: param.genId,
        name: param.name,
        email: param.email,
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
  id: string;
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
      const response = await AxiosNormal(param.token).delete(`users`, {
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
