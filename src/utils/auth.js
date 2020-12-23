
const TokenKey = 'Admin-Token'
const UserId = 'UserId'
export function getToken () {
  // return Cookies.get(TokenKey)
  return sessionStorage.getItem(TokenKey)
}

// export function setToken(token) {
//   return Cookies.set(TokenKey, token, { expires: 7 })
// }

export function removeToken () {
  // return Cookies.remove(TokenKey)
  return sessionStorage.removeItem(TokenKey)
}
export function setToken (token) {
  return sessionStorage.setItem(TokenKey, token)
}

// export function setToken(token) {
//   return Cookies.set(TokenKey, token, { expires: 7 })
// }
export function getUserId () {
  return sessionStorage.getItem(UserId)
}

export function removeUserId () {
  return sessionStorage.removeItem(UserId)
}
export function setUserId (id) {
  return sessionStorage.setItem(UserId, id)
}
