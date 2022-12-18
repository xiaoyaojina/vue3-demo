import { Method } from 'axios'
import { resolve } from 'path'
import service from './request'

// export function request(url: string, data: object, method: Method) {
//   return new Promise((resolve, reject) => {
//     // data post
//     // params get
//     service(url, { method: method, data})
//       .then(response => {
//         resolve(response)
//       })
//       .catch(error => {
//         reject(error)
//       })
//   })
// }

export function request(url: string, params: object, method: Method) {
  return new Promise((resolve, reject) => {
    // data post
    // params get
    if (method === 'get') {
      service(url, { method: method, params })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    } else if (method === 'post') {
      service(url, { method: method, data: params })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    }
  })
}
