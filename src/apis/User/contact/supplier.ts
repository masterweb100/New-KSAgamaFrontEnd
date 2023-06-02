import { AxiosNormal } from "../../../utils/interceptors";
import QueryString from "qs";

const uri = "suppliers";
export function HTTPGetSuppliers(param: {
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

export function HTTPAddSupplier(param: {
  token: string;
  nameSupplier: string;
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
        nameSupplier: param.nameSupplier,
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
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPGetSupplierID(param: { id: number }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(uri, {
        params: { id: param.id },
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPDeleteSuppliers(param: {
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
