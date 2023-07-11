import { AxiosNormal } from "../../../utils/interceptors";
import QueryString from "qs";
import axios from "axios";

const uri = "banks";
export function HTTPGetBanks(param: {
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

export function HTTPAddBanks(param: {
  token: string;
  genId: string;
  name: string;
  holderName: string;
  branchName: string;
  accountNumber: number;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(uri, {
        genId: param.genId,
        name: param.name,
        holderName: param.holderName,
        branchName: param.branchName,
        accountNumber: param.accountNumber,

      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPGetBanksID(param: { id: number }): Promise<any> {
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

export function HTTPDeleteBanks(param: {
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
