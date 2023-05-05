import { AxiosNormal } from "../utils/interceptors";

export function HTTPPermissions(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get("permissions");
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPRolePermissions(param: {
  roleId: number;
  permissions: any[];
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post("permissions/role", {
        roleId: param.roleId,
        permissions: param.permissions,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}
