import {baseHandlerAction} from './utils';
import { httpService, storageService, URLS } from "services";
import {tradeOptionsTypes} from '../models/trade-options';

export const getTradeOptionsSuccess = (payload) => {
  storageService.setLocal("user", JSON.stringify(payload));
  return baseHandlerAction(tradeOptionsTypes.TRADE_OPTIONS_SUCCESS_ACTION, payload);
};


export function tradeOptionsAction() {
  return dispatch => {
    dispatch(baseHandlerAction(tradeOptionsTypes.TRADE_OPTIONS_INIT_ACTION, true));
    const FAIL_ACTION = res => dispatch(baseHandlerAction(tradeOptionsTypes.TRADE_OPTIONS_FAIL_ACTION, {res}));
    return httpService().handleStatusCodes({
      200: (res) => dispatch(getTradeOptionsSuccess(res)),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(URLS.getTradeOptions);
  };
}
