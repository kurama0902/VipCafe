class StorageService {
  /**
   * @type {Storage}
   * @private
   */
  ls = localStorage;

  /**
   * @type {Storage}
   * @private
   */
  ss = sessionStorage;
  /**
   * @param key
   */
  getLocal(key) {
    return this.ls.getItem(key);
  }

  /**
   * @param key
   * @param value
   */
  setLocal(key, value) {
    this.ls.setItem(key, value)
  }

  /**
   * @param key
   */
  deleteLocal(key) {
    this.ls.removeItem(key)
  }
}

export const storageService = new StorageService();