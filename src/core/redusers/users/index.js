import {logoutActionTypes, loginActionTypes, changeUserInformation} from '../../models/auth';
import {generateReducer, baseHandlerReduser} from '../utils';

const initialState = {
  id : null,
  f_name : null,
  l_name : null,
  p_name : null,
  mail : null,
  tel : {
    number : null,
    telegram : null,
    viber : null,
  },
  site : null,
  city : null,
  company : null,
  trade_format : null,
  delivery : null,
  thumbnail : null,
  discount : 0,
};

export const userProfile = generateReducer(initialState, {
  /**
   * Listen logout action for cleaning user data after logout
   * @param state
   * @return {{fetching: boolean, isAuthorized: boolean}}
   */
  [logoutActionTypes.LOGOUT_SUCCESS_ACTION]: () => initialState,
  [loginActionTypes.LOGIN_SUCCESS_ACTION]: baseHandlerReduser,
  [changeUserInformation.DASHBOARD_CHANGE_USER_ACTION]: baseHandlerReduser,
});
