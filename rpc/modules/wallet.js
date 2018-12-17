import WalletService from '../../services/wallet'
import ErrorCode from '../error-code'
import { validators, middleware } from '../validation'

class Wallet {
  constructor (opts) {
    this._logger = opts.logger
    this._wallet = new WalletService()
    this._error = new ErrorCode()
    this.getBalance = middleware(this.getBalance.bind(this), 1, [
      [validators.empty]
    ])
  }
  async createWallet (params, cb) {
    try {
      console.log('start ctreate wallet')
      let headerParams = params[params.length - 1]
      let create = await this._wallet.createExchangeWallet(
        headerParams.APIKey,
        headerParams.APISecret
      )
      return cb(null, create)
    } catch (err) {
      return cb(err)
    }
  }

  async getBalance (params, cb) {
    try {
      const [address] = params
      const wallet = await this._wallet.getWalletByAddress(address)
      if (!wallet) throw this._error.internalError('WALLET_NOT_FOUND')
      const rs = {
        available: wallet.availableAmount
      }
      return cb(null, rs)
    } catch (error) {
      return cb(error)
    }
  }
}
module.exports = Wallet
