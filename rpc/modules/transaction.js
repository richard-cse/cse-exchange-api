import TransactionService from '../../services/transaction'
import { validators, middleware } from '../validation'
import ErrorCode from '../error-code'
import TransactionLogic from '../../logics/transaction'
class Transaction {
  constructor (opts) {
    this._logger = opts.logger
    this._transaction = new TransactionService()
    this._error = new ErrorCode()
    this._logic = new TransactionLogic(opts)
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

  async transfer (params, cb) {
    try {
      const [obj] = params
      let tokenParams = params[params.length - 1]
      console.log(tokenParams)
      let token = tokenParams.token
      let address = await this._logic.getAddressByToken(token)
      const transfer = await this._transaction.transferCSE(
        address,
        obj.toAddress,
        'CSE',
        obj.amount,
        'EXCHANGE',
        obj.exchangeID
      )
      return cb(null, transfer)
    } catch (err) {
      return cb(err)
    }
  }

  async getTransactionByAddress (params, cb) {
    try {
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
