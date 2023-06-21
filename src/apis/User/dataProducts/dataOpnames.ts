import { AxiosNormal } from "../../../utils/interceptors";

export function HTTPGetOpnames(param: { token: string }): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get('purchasing/opname');
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}

export function HTTPGetResultOpnames(param: { token: string }): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get('opname');
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}

export function HTTPUpdateStatusOpnames(param: {
    token: string;
    purchasingProductId: number;
    date: string;
    goodQty: number;
    damagedQty: number;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).post('opname', {
                purchasingProductId: param.purchasingProductId,
                date: param.date,
                goodQty: param.goodQty,
                damagedQty: param.damagedQty,
            });
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}