import {store} from "../../index";
import {baseHandlerAction} from "./utils";
import {httpService, URLS} from "../../services";
import {archiveActionTypes} from "../models/archive";

export function addToArchive(item) {
  return {
    type: archiveActionTypes.ADD_ARCHIVE_ITEM_ACTION,
    payload: {
      items : [...item]
    }
  };
}

function filterArchive(item) {
  return {
    type: archiveActionTypes.FILTER_ARCHIVE_ITEM_ACTION,
    payload: {
      items : [...item]
    }
  };
}

export function getArchive(params) {
  return dispatch => {
    dispatch(baseHandlerAction(archiveActionTypes.INIT_ARCHIVE_ITEM_ACTION, true));
    const FAIL_ACTION = (res) => dispatch(baseHandlerAction(archiveActionTypes.FAIL_ARCHIVE_ITEM_ACTION, {res}));
    return httpService().handleStatusCodes({
      200: (res) => params ? dispatch(filterArchive(res)) : dispatch(addToArchive(res)),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(URLS.getArchiveOrders + `?user=${store.getState().userProfile.id}&` + params); // ${store.getState().userProfile.id} //?user=2&
  };
}
