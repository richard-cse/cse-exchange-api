import jwt from 'jsonwebtoken'
import { SECRET_KEY, jwtOptions } from '../common/config'

// sign
export async function sign (obj) {
  return new Promise((resolve, reject) => {
    jwt.sign(obj, SECRET_KEY, jwtOptions, (error, token) => {
      if (error) return reject(error)
      resolve(token)
    })
  })
}
// verify
export async function verify (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (error, obj) => {
      if (error) return reject(error)
      delete obj.iat
      delete obj.exp
      resolve(obj)
    })
  })
}
