import { push, goBack } from "react-router-redux";

class RouterService {
  store = null;
  setStore(store) {
    this.store = store;
  }

  /**
   * @param location {string || object}
   */

  navigateTo = (location) => {
    if(typeof location !== "string" && !location.pathname) {
      throw new Error("location should be string or object with wield path but got: " + location.pathname || location);
    }
    this.store.dispatch(push(location))
  };

  goBack = () => {
    this.store.dispatch(goBack(-1))
  }
}

export default new RouterService()
