import WalletService from '../../services/wallet'
// import { validators, middleware } from '../validation'
import ErrorCode from '../error-code'
import * as Key from '../../utils/key'

class Wallet {
  constructor (opts) {
    this._logger = opts.logger
    this._wallet = new WalletService()
    this._error = new ErrorCode()
    // this.createWallet = middleware(this.createWallet.bind(this), 2, [
    //   [validators.coinAsset],
    //   [validators.empty]
    // ])
  }
  async createWallet (params, cb) {
    try {
      console.log('start ctreate wallet')
      const pk = await Key.createPrivateKey()
      let address = Key.privateKeyToAddress(pk.privateKey)
      await this._wallet.createWallet(
        'CSE',
        null,
        address,
        null
      )

      const privObj = Key.privateKeyToJson(pk)
      const rs = {
        privateKey: privObj.privateKey,
        address
      }
      return cb(null, rs)
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
