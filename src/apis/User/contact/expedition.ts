import { AxiosNormal } from "../../../utils/interceptors";
import QueryString from "qs";

const uri = "expeditions";
export function HTTPGenerateExpeditionID(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`${uri}/id`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPGetExpeditions(param: {
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

export function HTTPAddExpedition(param: {
  token: string;
  genId: string;
  nameExpedition: string;
  phone: number;
  address: string;
  shippingCostPerKg: number;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(uri, {
        genId: param.genId,
        nameExpedition: param.nameExpedition,
        phone: param.phone,
        address: param.address,
        shippingCostPerKg: param.shippingCostPerKg,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPGetExpeditionID(param: { id: number }): Promise<any> {
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

export function HTTPDeleteExpeditions(param: {
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
