import { AxiosNormal } from "../../../utils/interceptors";

export function HTTPReportsSalesDetail(param: {
    token: string;
    from: any;
    to: any;
    page: string;
    limit: string;
    q: any;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get('reportings/sale', {
                params: {
                    from: param.from,
                    to: param.to,
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

export function HTTPReportsSalesDetailByID(param: {
    token: string;
    id: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get(`sales/${param.id}`)
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}

export function HTTPReportsSalesProduct(param: {
    token: string;
    from: any;
    to: any;
    page: string;
    limit: string;
    q: any;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get('reportings/sale/product', {
                params: {
                    from: param.from,
                    to: param.to,
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

export function HTTPReportsSalesCustomer(param: {
    token: string;
    from: any;
    to: any;
    page: string;
    limit: string;
    q: any;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get('reportings/sale/customer', {
                params: {
                    from: param.from,
                    to: param.to,
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

export function HTTPReportsSalesCustomerByID(param: {
    token: string;
    customerId: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get('reportings/sale/customer', {
                params: { customerId: param.customerId },
            });
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}