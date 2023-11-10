import { httpService, storageService, URLS } from "services";
import {logoutActionTypes} from 'core/models/auth';
import {baseHandlerAction} from './utils';



/**
 * @param payload
 * @return {{type, payload}}
 */
export const logoutSuccessAction = payload => {
  storageService.deleteLocal("user");
  return baseHandlerAction(logoutActionTypes.LOGOUT_SUCCESS_ACTION, payload)
};
// const isAuthorized = false;
/**
 * @return {*|Promise<Response>}
 */
export function logoutAction() {
  // storageService.deleteLocal("user");
  // return dispatch => dispatch({
  //   type : logoutActionTypes.LOGOUT_SUCCESS_ACTION,
  //   payload : isAuthorized
  // });
  const hash = storageService.getLocal("user").session_id;

  return dispatch => {
    dispatch(baseHandlerAction(logoutActionTypes.LOGOUT_INIT_ACTION, {hash}));
    const FAIL_ACTION = (res) => dispatch(baseHandlerAction(logoutActionTypes.LOGOUT_FAIL_ACTION, {res}));
    return httpService().handleStatusCodes({
      200: (res) => dispatch(logoutSuccessAction(res)),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(URLS.logout + `?hash=${hash}`);
  };
}
