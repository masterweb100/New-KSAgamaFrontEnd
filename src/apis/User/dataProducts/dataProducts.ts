import { AxiosNormal } from "../../../utils/interceptors";

const uri = "products";
export function HTTPGetProducts(param: {
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

export function HTTPGetProductsQty(param: {
    token: string;
    page: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get(`${uri}/qty`, {
                params: {
                    page: param.page
                },
            });
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}