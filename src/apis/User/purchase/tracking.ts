import { AxiosNormal } from "../../../utils/interceptors";

const uri = 'purchasing/tracking'
export function HTTPGetTracking(param: {
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

export function HTTPPatchTracking(param: {
    purchasingProductId: string;
    status: string;
    token: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).patch(`${uri}/status`, {
                purchasingProductId: param.purchasingProductId,
                status: param.status
            });
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}