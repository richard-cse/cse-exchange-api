import TransactionService from '../../services/transaction'
import { validators, middleware } from '../validation'
import ErrorCode from '../error-code'
import ExchangeService from '../../services/exchange'
import * as Key from '../../utils/key'
class Transaction {
  constructor (opts) {
    this._logger = opts.logger
    this._transaction = new TransactionService()
    this._exchange = new ExchangeService()
    this._error = new ErrorCode()
    this.getTransactionByTxId = middleware(
      this.getTransactionByTxId.bind(this),
      1,
      [[validators.empty]]
    )
  }
  async getTransactionByTxId (params, cb) {
    try {
      const [txId] = params
      console.log('params ', params)
      const transaction = await this._transaction.getTransactionByTxId(txId)
      delete transaction._id
      delete transaction.__v
      delete transaction.types
      return cb(null, transaction)
    } catch (error) {
      return cb(error)
    }
  }
  /**
   * transfer
   * @param {toAddress, amount, apiKey, apiSecret} params
   * @param {*} cb
   */
  async transfer (params, cb) {
    try {
      const [obj] = params
      console.log('transfer')
      let headerParams = params[params.length - 1]
      let authorization = headerParams.authorization
      let address = await Key.privateKeyToAddress(authorization)
      let exchange = await this._exchange.checkExchange(
        obj.apiKey,
        obj.apiSecret
      )
      const transfer = await this._transaction.transferCSE(
        address,
        obj.toAddress,
        'CSE',
        obj.amount,
        'EXCHANGE',
        exchange.exchangeID
      )
      return cb(null, transfer)
    } catch (err) {
      return cb(err)
    }
  }

  async getTransactionByAddress (params, cb) {
    try {
      console.log('get transaction by address')
      const [address, type, { page, limit }] = params
      const transfer = await this._transaction.getTransactionByAddress(
        address,
        type,
        { page, limit }
      )
      return cb(null, transfer)
    } catch (err) {
      return cb(err)
    }
  }
}
module.exports = Transaction
