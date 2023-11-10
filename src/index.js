import React from 'react';
import App from './modules/App';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import { Provider } from 'react-redux';
import { configureStore, history } from './core';
import { RouterService } from './shared/services';

import {checkAuth} from './core/actions/check-auth';
import {getArchive, getNews, getShares} from "./core/actions";

export const store = configureStore();

store.dispatch(getShares())
store.dispatch(getNews())
store.dispatch(getArchive())

RouterService.setStore(store);
checkAuth(store.dispatch).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history}/>
    </Provider>,
    document.getElementById('root'));
});
