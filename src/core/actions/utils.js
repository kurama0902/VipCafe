export const baseHandlerAction = (type, data) => {
  return {
    type,
    payload: data,
  };
};
