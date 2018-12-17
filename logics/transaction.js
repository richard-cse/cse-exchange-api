import * as JWT from '../utils/jwt'
import * as Key from '../utils/key'
class Transaction {
  constructor (opts) {
    this._logger = opts.logger
  }
  async getAddressByToken (token) {
    let verify = await JWT.verify(token)
    const { privateKey } = verify
    if (!privateKey) return false
    const address = Key.privateKeyToAddress(privateKey)
    return address
  }
}
export default Transaction
