export default class WebStorageService {
  getLocalStorage = function (key) {
    const item = localStorage.getItem(key)
    try {
      return item !== null ? JSON.parse(item) : null
    } catch (error) {
      return item
    }
  }

  setLocalStorage = function (key, data) {
    localStorage.setItem(key, (typeof data === 'object' ? JSON.stringify(data) : data))
  }

  removeLocalStorage = function (key) {
    localStorage.removeItem(key)
  }

  clearLocalStorage = function () {
    localStorage.clear()
  }

  getSessionStorage = function (key) {
    const item = sessionStorage.getItem(key)
    try {
      return item !== null ? JSON.parse(item) : null
    } catch (error) {
      return item
    }
  }

  setSessionStorage = function (key, data) {
    sessionStorage.setItem(key, (typeof data === 'object' ? JSON.stringify(data) : data))
  }

  removeSessionStorage = function (key) {
    sessionStorage.removeItem(key)
  }

  clearSessionStorage = function () {
    sessionStorage.clear()
  }
}
