import { AxiosNormal } from "../../../utils/interceptors";
import QueryString from "qs";

const uri = "approvals/purchasing";
export function HTTPGetApprovalsPurchasing(param: {
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

export function HTTPPatchApprovalPurchasing(param: {
    purchasingId: string;
    approvalStatus: string;
    token: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).patch(uri, {
                purchasingId: param.purchasingId,
                approvalStatus: param.approvalStatus
            });
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}