import {baseHandlerAction} from './utils';
import { httpService, storageService, URLS } from "services";
import {deliveryOptionsTypes} from '../models/delivery-options';

export const getDeliveryOptionsSuccess = (payload) => {
  storageService.setLocal("user", JSON.stringify(payload));
  return baseHandlerAction(deliveryOptionsTypes.DELIVERY_OPTIONS_SUCCESS_ACTION, payload);
};


export function deliveryOptionsAction() {
  return dispatch => {
    dispatch(baseHandlerAction(deliveryOptionsTypes.DELIVERY_OPTIONS_INIT_ACTION, true));
    const FAIL_ACTION = res => dispatch(baseHandlerAction(deliveryOptionsTypes.DELIVERY_OPTIONS_FAIL_ACTION, {res}));
    return httpService().handleStatusCodes({
      200: (res) => dispatch(getDeliveryOptionsSuccess(res)),
      400: FAIL_ACTION,
      500: FAIL_ACTION,
    }).getRequest(URLS.getDeliveryOptions);
  };
}
