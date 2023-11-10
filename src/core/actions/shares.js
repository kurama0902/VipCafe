import {store} from "index";
import {baseHandlerAction} from "./utils";
import { httpService, URLS } from "../../services";
import {sharesActionTypes} from '../models/shares-and-news';

function successShares(res) {
  return {
    type: sharesActionTypes.ADD_TO_SHARES_ITEM_ACTION,
    payload: {
      ...res
    }
  };
}

export function getShares() {
  return dispatch => {
    dispatch(baseHandlerAction(sharesActionTypes.INIT_TO_SHARES_ITEM_ACTION, true));
    const FAIL_ACTION = (res) => dispatch(baseHandlerAction(sharesActionTypes.FAIL_TO_SHARES_ITEM_ACTION, {res}));
    return httpService().handleStatusCodes({
      200: (res) => dispatch(successShares(res)),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(URLS.shares + `?user_id=${store.getState().userProfile.id}`);
  };
}
