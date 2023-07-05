import { AxiosNormal } from "../../../utils/interceptors";

const url = 'reportings/sale'
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
            const response = await AxiosNormal(param.token).get(`${url}`, {
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
            const response = await AxiosNormal(param.token).get(`${url}/product`, {
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
            const response = await AxiosNormal(param.token).get(`${url}/customer`, {
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
            const response = await AxiosNormal(param.token).get(`${url}/customer`, {
                params: { customerId: param.customerId },
            });
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}

export function HTTPReportsSalesDebt(param: {
    token: string;
    from: any;
    to: any;
    page: string;
    limit: string;
    q: any;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get(`${url}/debt`, {
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

export function HTTPReportsSalesDebtByID(param: {
    token: string;
    from: any;
    to: any;
    page: string;
    limit: string;
    q: any;
    salesId: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get(`${url}/debt/${param.salesId}`, {
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