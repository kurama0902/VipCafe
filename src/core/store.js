import thunk from "redux-thunk";
import rootReducer from "./redusers";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { createStore, applyMiddleware, compose } from "redux";

export const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history))
);

export function configureStore(initialState = {}) {
  return  createStore(
    rootReducer,
    initialState,
    enhancer
  );
}
