import {basketActionTypes} from '../models/basket';

export function addToBasket(item) {
  return {
    type: basketActionTypes.ADD_BASKET_ITEM_ACTION,
    payload: {
      item: {
        ...item,
      },
    },
  };
}

export function changeBasket(item) {
  return {
    type: basketActionTypes.CHANGE_BASKET_ITEM_ACTION,
    payload: {
      item: {
        ...item,
      },
    },
  };
}

export function removeItemWithBasket(id) {
  return {
    type: basketActionTypes.REMOVE_BASKET_ITEM_ACTION,
    payload: id,
  };
}

export function setSale(sale) {
  return {
    type: basketActionTypes.SATE_BASKET_SALE_ACTION,
    payload: {
      sale
    }
  }
}

export function clearBasket() {
  return {
    type: basketActionTypes.REMOVE_ALL_BASKET_ITEMS_ACTION
  };
}
