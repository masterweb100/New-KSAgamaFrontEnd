import { AxiosNormal } from "../../../utils/interceptors";

export function HTTPReportsMonetary(param: {
    token: string;
    from: any;
    to: any;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get('reportings', {
                params: {
                    from: param.from,
                    to: param.to
                },
            });
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}