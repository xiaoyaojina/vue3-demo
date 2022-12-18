// const tokenKey = 'Authorization'

// // 设置token
// export function getToken() {
//   return localStorage.getItem(tokenKey)
// }

// // 修改token
// export function setToken(token: string) {
//   return localStorage.setItem(tokenKey, token)
// }

// // 删除token
// export function removeToken() {
//   return localStorage.removeItem(tokenKey)
// }

export const storage = {
  // 存储
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  // 取出数据
  get(key: string) {
    const value = localStorage.getItem(key)
    if (value && value !== 'undefined' && value !== 'null') {
      return JSON.parse(value)
    }
  },
  // 删除数据
  remove(key: string) {
    localStorage.removeItem(key)
  },
}

export const sessionStorages = {
  // 存储
  set(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  // 取出数据
  get(key: string) {
    const value = sessionStorage.getItem(key)
    if (value && value !== 'undefined' && value !== 'null') {
      return JSON.parse(value)
    }
    return null
  },
  // 删除数据
  remove(key: string) {
    sessionStorage.removeItem(key)
  },
}

export const getDate = (time: number) => {
  const date = new Date(time * 1000)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const times = `${Y}.${M}.${D}`
  return times
}

// 一天
export const getTime = (times: number) => {
  const date = 1000 * 60 * 60 * 24
  const d = Number((7 - times / date).toFixed())
  return d
}
