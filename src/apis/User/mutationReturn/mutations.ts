import { AxiosNormal } from "../../../utils/interceptors";
import QueryString from "qs";

const uri = "mutations";
export function HTTPGenerateMutationID(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal().get(`${uri}/id`);
            return resolve(response);
        } catch (error) {
            return reject(error);
        }
    });
}

export function HTTPGetMutations(param: {
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

export function HTTPAddMutation(param: {
    date: string;
    productUnitId: number;
    qty: number;
    storeDestinationId: number;
    genId: string;
    token: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).post(uri, {
                date: param.date,
                productUnitId: param.productUnitId,
                qty: param.qty,
                storeDestinationId: param.storeDestinationId,
                genId: param.genId,
            });
            return resolve(response);
        } catch (error) {
            return reject(error);
        }
    });
}

export function HTTPGetMutationID(param: { id: number }): Promise<any> {
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

export function HTTPPatchMutations(param: {
    token: string;
    mutationId: string;
    approvalStatus: string
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).patch(uri, {
                mutationId: param.mutationId,
                approvalStatus: param.approvalStatus
            });
            return resolve(response);
        } catch (error) {
            return reject(error);
        }
    });
}

export function HTTPDeleteMutations(param: {
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
