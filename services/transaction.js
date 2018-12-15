import Service from "./service";
class TransactionService extends Service {
  constructor() {
    super("transaction", {});
  }
  getTransactionByTxId(txId) {
    return this.fetch("getTransactionByTxId", [txId]);
  }
}
export default TransactionService;
