import { httpService, storageService, URLS } from "services";

const registerSuccess = (payload) => {
  storageService.setLocal("user", JSON.stringify(payload));
};

export function registrationAction(params) {
  const body = JSON.stringify(params);
  const FAIL_ACTION = (res) => console.error(res);
  return httpService().handleStatusCodes({
    200: (res) => registerSuccess(res),
    400 : FAIL_ACTION,
    500: FAIL_ACTION,
  }).postRequest(URLS.registerApi, body);
}
