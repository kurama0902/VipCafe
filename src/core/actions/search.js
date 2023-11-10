import {baseHandlerAction} from "./utils";
import {httpService, URLS} from "../../services";
import {searchActionTypes} from "../models/search";

export function successSearchAction(res) {
  return {
    type : searchActionTypes.SUCCESS_SEARCH_ACTION,
    payload : {
      items : [...res.products]
    }
  }
}

export function search(value) {
  return dispatch => {
    dispatch(baseHandlerAction(searchActionTypes.INIT_SEARCH_ACTION, true));
    const FAIL_ACTION = (res) => dispatch(baseHandlerAction(searchActionTypes.FAIL_SEARCH_ACTION, {res}));
    return httpService().handleStatusCodes({
      200: (res) => dispatch(successSearchAction(res)),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(URLS.search + `?search=${value}`);
  };
}
