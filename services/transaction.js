import Service from "./service";
class TransactionService extends Service {
  constructor() {
    super("transaction", {});
  }
  getTransactionByTxId(txId) {
    return this.fetch("getTransactionByTxId", [txId]);
  }
  transfer(fromAddress, toAddress, coinAsset, amount, types) {
    return this.fetch("transfer", [
      fromAddress,
      toAddress,
      coinAsset,
      amount,
      types
    ]);
  }
}
export default TransactionService;
