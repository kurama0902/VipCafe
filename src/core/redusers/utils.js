export function generateReducer(initialState, handlers) {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  }
}

/**
 * @param state
 * @param action
 * @return {{}}
 */
export const baseHandlerReduser = (state, action) => {
  return {
    ...state,
    ...action.payload
  }
};
