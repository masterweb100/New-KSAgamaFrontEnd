import { AxiosNormal } from "../../../utils/interceptors";
import QueryString from "qs";

const uri = "approvals/mutations";
export function HTTPGetApprovalsMutations(param: {
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

export function HTTPPatchApprovalMutations(param: {
    mutationId: string;
    approvalStatus: string;
    token: string;
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