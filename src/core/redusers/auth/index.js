import {generateReducer} from '../utils';
import {
  loginActionTypes,
  logoutActionTypes,
  registrationActionTypes,
} from '../../models/auth';

const initialState = {
  isAuthorized: false,
  fetching: false,
};

const loginFailReducer = (state) => {
  return {
    ...state,
    fetching: false,
  };
};

const loginInitReducer = (state) => {
  return {
    ...state,
    fetching: true,
  };
};

const loginSuccessReducer = (state) => {
  return {
    ...state,
    isAuthorized: true,
    fetching: false,
  };
};

const logoutInitReducer = (state) => {
  return {
    ...state,
    fetching: true,
  };
};

const logoutSuccessReducer = (state) => {
  return {
    ...state,
    fetching: false,
    isAuthorized: false,
  };
};

const logoutFailReducer = (state) => {
  return {
    ...state,
    fetching: false,
  };
};

export const auth = generateReducer(initialState, {
  [loginActionTypes.REGISTRATION_INIT_ACTION]: loginInitReducer,
  [registrationActionTypes.REGISTRATION_SUCCESS_ACTION]: loginSuccessReducer,
  [loginActionTypes.REGISTRATION_FAIL_ACTION]: loginFailReducer,

  [loginActionTypes.LOGIN_SUCCESS_ACTION]: loginSuccessReducer,

  [loginActionTypes.LOGIN_INIT_ACTION]: loginInitReducer,

  [loginActionTypes.LOGIN_FAIL_ACTION]: loginFailReducer,

  [loginActionTypes.LOGOUT_INIT_ACTION]: logoutInitReducer,

  [logoutActionTypes.LOGOUT_SUCCESS_ACTION]: logoutSuccessReducer,

  [loginActionTypes.LOGOUT_FAIL_ACTION]: logoutFailReducer,
});
