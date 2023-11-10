import { httpService, URLS } from "services";

export function resetPassAction(params) {
  const body = JSON.stringify(params);
  const FAIL_ACTION = (res) => console.error(res);
  return httpService().handleStatusCodes({
    400 : FAIL_ACTION,
    500: FAIL_ACTION,
  }).postRequest(URLS.resetPassword, body);
}
