import { AxiosNormal } from "../../../utils/interceptors";
import QueryString from "qs";
import axios from "axios";

const uri = "customers";
export function HTTPGetCustomers(param: {
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

export function HTTPAddCustomer(param: {
  token: string;
  nameCustomer: string;
  nameCustomerOpt: string;
  nameCompany: string;
  address: string;
  country: string;
  provinceId: number;
  cityId: number;
  email: string;
  phone: number;
  identityType: string;
  identityNo: string;
  npwp: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(uri, {
        nameCustomer: param.nameCustomer,
        nameCustomerOpt: param.nameCustomerOpt,
        nameCompany: param.nameCompany,
        address: param.address,
        country: param.country,
        provinceId: param.provinceId,
        cityId: param.cityId,
        email: param.email,
        phone: param.phone,
        identityType: param.identityType,
        identityNo: param.identityNo,
        npwp: param.npwp,
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPGetCustomerID(param: { id: number }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(uri, {
        params: { id: param.id },
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPDeleteCustomers(param: {
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
