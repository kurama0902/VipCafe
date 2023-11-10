import 'whatwg-fetch';
import {LoggerService, storageService} from './';
import {loginSuccess} from 'core/actions';

export const SERVER_API_URL = "http://vipkafe.com.ua/wp-json/"; //s6525203

export const responseTypes = {
  json: 'json',
  blob: 'blob',
  text: 'text',
  formData: 'formData',
  arrayBuffer: 'arrayBuffer',
};

export const tokenKey = 'platformToken';

export const URLS = {
  shop : "wp/v2/shop",
  login : "vipcaffe/v1/user/",
  resetPassword : "vipcaffe/v1/forgotpwd",
  getProducts : "vipcaffe/v1/get_products",
  registerApi : "vipcaffe/v1/add_user_func",
  logout : "vipcaffe/v1/logout_session",
  orders : "vipcaffe/v1/getorders",
  checkSession : "vipcaffe/v1/return_session",
  changeUserInformation : "vipcaffe/v1/edituser",
  getTradeOptions : "vipcaffe/v1/get_trade_options",
  getDeliveryOptions : "vipcaffe/v1/get_delivery_options",
  shares : "wp/v2/shares",
  news : "wp/v2/news",
  getCart : "vipcaffe/v1/get-cart", // params {hash} return items
  setCart : "vipcaffe/v1/set-cart", // params {hash}
  deleteCart : "vipcaffe/v1/delete-cart", // params {hash}
  feedback : "vipcaffe/v1/feedback", // params {email, message, phone}
  repeatOrder : "vipcaffe/v1/repeat_order", // params {id order} if ok return order{}
  getArchiveOrders : "vipcaffe/v1/get_orders", // param {id user} {date_start=2019-02-02 & date_end=2019-03-04 & search=30} return user orders
  search : "vipcaffe/v1/get_products", // param {search=Barilla} return products
};

let store = null;
let secureToken = null;

class HttpService {
  /**
   * @type {{'Content-Type': string}}
   * @private
   */
  _mainHeaders = {
    'Content-Type': 'application/json',
  };

  /**
   * @type {string}
   * @private
   */
  _responseType;

  /**
   * @private
   * @type {string}
   */
  LINK = '';

  /**
   * array of codes to handle
   * @type {object}
   * @private
   */
  _codesToHandle = {};

  /**
   * @private
   * @type {string}
   */
  METHOD = 'GET';

  /**
   * check if we have action for status cote that we got and if so run the action
   * @param status
   * @param convertedResponse
   * @private
   */
  _checkResponseCodes = (status, convertedResponse) => {
    const statusAction = this._codesToHandle[status];
    if (statusAction && typeof  statusAction === 'function') {
      convertedResponse.then(res => {
        statusAction(res);
        this._codesToHandle = {};
      });
    } else {
      this._codesToHandle = {};
    }
    if (status !== 200) {
      LoggerService.log(status, convertedResponse, this.LINK, this.METHOD);
    }
    if (status === 401) {
      // store.dispatch(logoutAction());
      LoggerService.log(status, convertedResponse, this.LINK, this.METHOD);
    }
  };

  _convertResponse = res => {
    let response = null;
    const contentType = res.headers.get('Content-Type');
    if (~contentType.indexOf('text/plain')) {
      response = res.text();
    } else if (~contentType.indexOf('application/json')) {
      response = res.json();
    } else {
      switch (this._responseType) {
        case responseTypes.blob:
          response = res.blob();
          break;
        case responseTypes.formData:
          response = res.formData();
          break;
        case responseTypes.arrayBuffer:
          response = res.arrayBuffer();
          break;
        default:
          response = Promise.resolve(res);
          break;
      }
    }
    this._checkResponseCodes(res.status, response);
    return response;
  };

  /**
   * return full api link if it exists
   * @param link {string} required
   * @return {string} link to api
   * @private
   */
  set _apiLink(link) {
    this.LINK = SERVER_API_URL + link;
  }

  static checkToken(_store) {
    const token = storageService.getLocal(tokenKey);
    store = _store;
    if (token) {
      store.dispatch(loginSuccess({}, token));
    }
  }

  static setToken(token) {
    if (typeof token !== 'string') {
      throw  new Error('Token should be string but got : ' + typeof token);
    }
    secureToken = token;
    storageService.setLocal(tokenKey, token);
  }

  static deleteToken() {
    secureToken = undefined;
    storageService.deleteLocal(tokenKey);
  }

  /**
   * to handel response code after in will calls
   * @param codes { object }
   * @return {HttpService}
   * @example  handleResponseByStatusCodes({ 200 : (res) => { code... }, 500 : (res) => { code... }  })
   */
  handleStatusCodes(codes) {
    this._codesToHandle = codes;
    return this;
  }

  /**
   * Generate get request
   * @param url {string}
   * @param [headers] {object}
   * @returns {Promise<any>}
   */
  getRequest(url, headers) {
    this.METHOD = 'GET';
    return this._fetch(url, undefined, headers);
  }

  putRequest(url, body = "", headers) {
    this.METHOD = 'PUT';
    return this._fetch(url, {body: body}, headers);
  }

  /**
   * Generate post request
   * @param url {string}
   * @param [body {string || formData}
   * @param [headers] {object}
   * @returns {Promise<Response>}
   */
  postRequest(url, body = '', headers) {
    this.METHOD = 'POST';
    return this._fetch(url, {body: body}, headers);
  }

  /**
   * @param url
   * @param additional
   * @param headers
   * @private
   */
  _fetch(url, additional = {}, headers = {}) {
    this._apiLink = url;
    const authorization = secureToken ? {Authorization: 'Bearer ' + secureToken} : {};
    return fetch(this.LINK, {
      ...additional,
      method: this.METHOD,
      headers: {
        ...this._mainHeaders,
        ...headers,
        ...authorization,
      },
    }).then(this._convertResponse);
  }
}

export const httpService = () => new HttpService();
