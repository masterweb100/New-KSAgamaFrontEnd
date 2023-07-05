import { AxiosNormal } from "../../../utils/interceptors";

const url = 'reportings/purchasing'
export function HTTPReportsPurchasingDetail(param: {
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

export function HTTPReportsPurchasingDetailByID(param: {
    token: string;
    id: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get(`purchasing/${param.id}`)
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}

export function HTTPReportsPurchasingProduct(param: {
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

export function HTTPReportsPurchasingSupplier(param: {
    token: string;
    from: any;
    to: any;
    page: string;
    limit: string;
    q: any;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get(`${url}/supplier`, {
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

export function HTTPReportsPurchasingSupplierByID(param: {
    token: string;
    supplierId: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get(`${url}/supplier`, {
                params: { supplierId: param.supplierId },
            });
            return resolve(response);
        } catch (error: any) {
            return reject(error);
        }
    });
}

export function HTTPReportsPurchasingDebt(param: {
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

export function HTTPReportsPurchasingDebtByID(param: {
    token: string;
    from: any;
    to: any;
    page: string;
    limit: string;
    q: any;
    purchasingId: string;
}): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosNormal(param.token).get(`${url}/debt/${param.purchasingId}`, {
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