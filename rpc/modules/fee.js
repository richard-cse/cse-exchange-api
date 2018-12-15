import FeeService from '../../services/fee'
import { validators, middleware } from '../validation'
import ErrorCode from '../error-code'
class Fee {
  constructor (opts) {
    this._logger = opts.logger
    this._fee = new FeeService()
    this._error = new ErrorCode()
    this.getFeeByCoin = middleware(this.getFeeByCoin.bind(this), 1, [
      [validators.coinAsset]
    ])
  }
  async getPriceByCSE (params, cb) {
    try {
      let price = await this._fee.getPriceByCSE()
      return cb(null, price)
    } catch (err) {
      return cb(err)
    }
  }
  async getFeeByCoin (params, cb) {
    try {
      const [coinAsset] = params
      console.log('params', coinAsset)
      let fee = await this._fee.getFeeByCoin(coinAsset)
      return cb(null, fee)
    } catch (err) {
      return cb(err)
    }
  }
}
module.exports = Fee
