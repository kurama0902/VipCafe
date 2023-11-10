import {generateReducer} from './utils';
import {newsActionTypes, sharesActionTypes} from '../models/shares-and-news';

const initialState = {};

const addHandler = (state, action) => {
  return {
    ...state,
    ...action.payload,
  };
};

export const news = generateReducer(initialState, {
  [newsActionTypes.FAIL_TO_NEWS_ITEM_ACTION]: () => initialState,
  [newsActionTypes.ADD_TO_NEWS_ITEM_ACTION]: addHandler,
});

export const shares = generateReducer(initialState, {
  [sharesActionTypes.FAIL_TO_SHARES_ITEM_ACTION]: () => initialState,
  [sharesActionTypes.ADD_TO_SHARES_ITEM_ACTION]: addHandler,
});
