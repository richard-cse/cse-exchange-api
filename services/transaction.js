import Service from "./service";
class TransactionService extends Service {
  constructor() {
    super("transaction", {});
  }
  getTransactionByTxId(txId) {
    return this.fetch("getTransactionByTxId", [txId]);
  }
  transfer(fromAddress, toAddress, coinAsset, amount) {
    return this.fetch("transfer", [
      fromAddress,
      toAddress,
      coinAsset,
      amount
    ]);
  }
}
export default TransactionService;
