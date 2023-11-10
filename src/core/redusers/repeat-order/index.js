import {generateReducer} from '../utils';
import {repeatOrderTypes} from '../../models/repeat-order';

const initialState = [];

const addHandler = (state, action) => {
  return [
    ...state,
    ...action.payload.items,
  ];
};

export const repeatOrder = generateReducer(initialState, {
  [repeatOrderTypes.REPEAT_ORDER_SUCCESS_ACTION]: addHandler,
  [repeatOrderTypes.REPEAT_ORDER_FAIL_ACTION]: initialState,
});
