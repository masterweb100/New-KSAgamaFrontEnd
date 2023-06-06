import QueryString from "qs";
import { AxiosNormal } from "../../../utils/interceptors";

const uri = "product-units";
export function HTTPGenerateUnitsID(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await AxiosNormal().get(`${uri}/id`);
        return resolve(response);
      } catch (error) {
        return reject(error);
      }
    });
  }

  export function HTTPGetUnits(param: {
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
  
  export function HTTPAddUnits(param: {
    typeName: string;
    genId: string;
    token: string;
    productBrandId: number;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await AxiosNormal(param.token).post(uri, {
          typeName: param.typeName,
          genId: param.genId,
          productBrandId: param.productBrandId,
        });
        return resolve(response);
      } catch (error) {
        return reject(error);
      }
    });
  }
  
  export function HTTPUpdateUnits(param: {
    typeName: string;
    id: string;
    token: string;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await AxiosNormal(param.token).put(
          `${uri}/${param.id}`,
          {
            typeName: param.typeName,
          }
        );
        return resolve(response);
      } catch (error) {
        return reject(error);
      }
    });
  }
  
  export function HTTPDeleteUnits(param: {
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
  