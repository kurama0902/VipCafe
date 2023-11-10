import {generateReducer} from '../utils';
import {archiveActionTypes} from '../../models/archive';

const initialState = [];

const addHandler = (state, action) => {
  return [
    ...state,
    ...action.payload.items,
  ];
};

const filterHandler = (state, action) => {
  return [
    ...action.payload.items
  ];
};

export const archive = generateReducer(initialState, {
  [archiveActionTypes.ADD_ARCHIVE_ITEM_ACTION]: addHandler,
  [archiveActionTypes.FILTER_ARCHIVE_ITEM_ACTION]: filterHandler,
  [archiveActionTypes.FAIL_ARCHIVE_ITEM_ACTION]: initialState,
});
