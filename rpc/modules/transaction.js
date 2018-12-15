import TransactionService from "../../services/transaction";
import { validators, middleware } from "../validation";
import ErrorCode from "../error-code";
class Transaction {
  constructor(opts) {
    this._logger = opts.logger;
    this._transaction = new TransactionService();
    this._error = new ErrorCode();
    this.getTransactionByTxId = middleware(
      this.getTransactionByTxId.bind(this),
      1,
      [[validators.empty]]
    );
  }
  async getTransactionByTxId(params, cb) {
    try {
      const [txId] = params;
      console.log("params ", params);
      const transaction = await this._transaction.getTransactionByTxId(txId);
      return cb(null, transaction);
    } catch (error) {
      return cb(error);
    }
  }
}
module.exports = Transaction;
