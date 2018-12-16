import Service from './service'
class TransactionService extends Service {
  constructor () {
    super('transaction', {})
  }
  getTransactionByTxId (txId) {
    return this.fetch('getTransactionByTxId', [txId])
  }
  transferCSE (fromAddress, toAddress, coinAsset, amount, types, exchangeID) {
    return this.fetch('transferCSE', [
      fromAddress,
      toAddress,
      coinAsset,
      amount,
      types,
      exchangeID
    ])
  }

  getTransactionByAddress (address, type, options) {
    return this.fetch('getTransactionByAddress', [address, type, options])
  }
}
export default TransactionService
