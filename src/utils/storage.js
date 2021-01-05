var storage = {
  /**
   *
   * @param {localStorage} key
   * @param {localStorage} value
   *
   */

  // 存储
  localSet (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  // 取出数据
  localGet (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  // 删除数据
  localRemove (key) {
    localStorage.removeItem(key)
  },

  /**
   *
   * @param {sessionStorage} key
   * @param {sessionStorage} value
   *
   */

  // 存储
  sessionSet (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  // 取出数据
  sessionGet (key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  // 删除数据
  sessionRemove (key) {
    sessionStorage.removeItem(key)
  }

}

// 暴露给外部访问
export default storage
