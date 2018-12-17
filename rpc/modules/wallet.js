import WalletService from '../../services/wallet'
import ErrorCode from '../error-code'

class Wallet {
  constructor (opts) {
    this._logger = opts.logger
    this._wallet = new WalletService()
    this._error = new ErrorCode()
  }
  async createWallet (params, cb) {
    try {
      console.log('start ctreate wallet')
      let generate = await this._wallet.generateAddress()
      await this._wallet.createWallet('CSE', null, generate.address, null)
      return cb(null, generate)
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
