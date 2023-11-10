import { store } from "index";
import {baseHandlerAction} from "./utils";
import { httpService, URLS } from "../../services";
import {newsActionTypes} from '../models/shares-and-news';

function successNews(res) {
  return {
    type: newsActionTypes.ADD_TO_NEWS_ITEM_ACTION,
    payload: {
      ...res
    }
  };
}

export function getNews() {
  return dispatch => {
    dispatch(baseHandlerAction(newsActionTypes.INIT_TO_NEWS_ITEM_ACTION, true));
    const FAIL_ACTION = (res) => dispatch(baseHandlerAction(newsActionTypes.FAIL_TO_NEWS_ITEM_ACTION, {res}));
    return httpService().handleStatusCodes({
      200: (res) => dispatch(successNews(res)),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(URLS.news + `?user_id=${store.getState().userProfile.id}`);
  };
}
