import { AxiosNormal } from "../../utils/interceptors";

export function HTTPLocProvinces(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get("/provinces");
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPLocCities(param: { provinceId: string }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get("/cities", {
        params: {
          provinceId: param.provinceId,
        },
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPLocDistricts(param: { cityId: string }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get("/districts", {
        params: {
          cityId: param.cityId,
        },
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPLocSubDistricts(param: {
  districtId: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get("/subdistricts", {
        params: {
          districtId: param.districtId,
        },
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}
