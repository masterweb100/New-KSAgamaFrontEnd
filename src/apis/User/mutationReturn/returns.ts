import { AxiosNormal } from "../../../utils/interceptors";
import QueryString from "qs";

const uri = "product-returns";
export function HTTPGetReturns(param: {
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

export function HTTPPatchReturns(param: {
    token: string;
    productReturnId: string;
    status: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).patch(uri, {
                productReturnId: param.productReturnId,
                status: param.status
            });
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}