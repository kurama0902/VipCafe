import {baseHandlerAction} from "./utils";
import {httpService, URLS} from "../../services";
import {repeatOrderTypes} from "../models/repeat-order";

function repeatOrder(item) {
  return {
    type : repeatOrderTypes.REPEAT_ORDER_SUCCESS_ACTION,
    payload: {
      items : item
    }
  }
}

export function getRepeatOrder(id) {
  return dispatch => {
    dispatch(baseHandlerAction(repeatOrderTypes.REPEAT_ORDER_INIT_ACTION, true));
    const FAIL_ACTION = (res) => dispatch(baseHandlerAction(repeatOrderTypes.REPEAT_ORDER_FAIL_ACTION, {res}));
    return httpService().handleStatusCodes({
      200: (res) => dispatch(repeatOrder(res)),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(URLS.repeatOrder + `?id=${id}`);
  };
}
