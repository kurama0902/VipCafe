import {basketActionTypes} from '../../models/basket';
import {generateReducer} from '../utils';

const initialState = {
  items: [],
  price : 0,
  sale : 0
};
const calculatePrice = (items) => {
  let price = 0;
  items.forEach(i => {
    price += i.price * i.count
  });
  return price;
};

const changeAndAddHandler = (state, action) => {
  const item = action.payload.item;
  const newItems = state.items.filter((i) => item.id !== i.id);
  newItems.push(item);
  return {
    ...state,
    items : newItems,
    price : calculatePrice(newItems)
  };
};

const removeItemHandler = (state, action) => {
  const idItem = action.payload;
  const newItems = state.items.filter((i) => idItem !== i.id);
  return {
    ...state,
    items : newItems,
    price : calculatePrice(newItems)
  };
};

export const basket = generateReducer(initialState, {
  [basketActionTypes.REMOVE_ALL_BASKET_ITEMS_ACTION]: (state) => {
    return {
      ...initialState,
      sale : state.sale
    };
  },
  [basketActionTypes.SATE_BASKET_SALE_ACTION]: (state, action) => {
    return {
      ...state,
      sale : action.payload.sale
    }
  },
  [basketActionTypes.ADD_BASKET_ITEM_ACTION]: changeAndAddHandler,
  [basketActionTypes.CHANGE_BASKET_ITEM_ACTION]: changeAndAddHandler,
  [basketActionTypes.REMOVE_BASKET_ITEM_ACTION]: removeItemHandler,
});
