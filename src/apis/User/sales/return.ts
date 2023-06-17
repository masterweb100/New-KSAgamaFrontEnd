import QueryString from "qs";
import { AxiosNormal } from "../../../utils/interceptors";

const uri = 'sales/return';
export function HTTPGenerateReturnID(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal().get(`${uri}/id`);
            return resolve(response);
        } catch (error) {
            return reject(error);
        }
    });
}

export function HTTPGetReturn(param: {
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

export function HTTPGetReturnBySaleID(param: {
    token: string;
    saleId: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get(`${uri}/products`, {
                params: {
                    saleId: param.saleId
                },
            });
            return resolve(response);
        } catch (error) {
            return reject(error);
        }
    });
}

export function HTTPAddReturn(param: {
    token: string;
    saleId: string;
    saleProductId: number;
    qtyReturn: number;
    saleReturnStatus: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).post(uri, {
                saleId: param.saleId,
                saleProductId: param.saleProductId,
                qtyReturn: param.qtyReturn,
                saleReturnStatus: param.saleReturnStatus,
            });
            return resolve(response);
        } catch (error) {
            return reject(error);
        }
    });
}

export function HTTPDeleteReturn(param: {
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
