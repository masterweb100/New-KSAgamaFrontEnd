import QueryString from "qs";
import { AxiosNormal } from "../../../utils/interceptors";

const uri = 'sales';
export function HTTPGenerateSalesID(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await AxiosNormal().get(`${uri}/id`);
        return resolve(response);
      } catch (error) {
        return reject(error);
      }
    });
  }
  
  export function HTTPGetSales(param: {
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
      } catch (error) {
        return reject(error);
      }
    });
  }
  
  export function HTTPAddSales(param: {
    categoryName: string;
    genId: string;
    token: string;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await AxiosNormal(param.token).post(uri, {
          categoryName: param.categoryName,
          genId: param.genId,
        });
        return resolve(response);
      } catch (error) {
        return reject(error);
      }
    });
  }
  
  export function HTTPUpdateSales(param: {
    categoryName: string;
    id: string;
    token: string;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await AxiosNormal(param.token).put(
          `${uri}/${param.id}`,
          {
            categoryName: param.categoryName,
          }
        );
        return resolve(response);
      } catch (error) {
        return reject(error);
      }
    });
  }
  
  export function HTTPDeleteSales(param: {
    id: string;
    token: string;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await AxiosNormal(param.token).delete(uri, {
          params: {
            id: param.id,
          },
        });
        return resolve(response);
      } catch (error) {
        return reject(error);
      }
    });
  }
  