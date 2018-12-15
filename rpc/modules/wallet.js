import WalletService from "../../services/wallet";
import { validators, middleware } from "../validation";
import ErrorCode from "../error-code";
class Wallet {
  constructor(opts) {
    this._logger = opts.logger;
    this._wallet = new WalletService();
    this._error = new ErrorCode();
    this.createWallet = middleware(this.createWallet.bind(this), 2, [
      [validators.coinAsset],
      [validators.empty]
    ]);
  }
  async createWallet(params, cb) {
    try {
      const [coinAsset, userId, contractAddress, address] = params;
      console.log(coinAsset);
      let wallet = await this._wallet.createWallet(
        coinAsset,
        userId,
        contractAddress,
        address
      );
      return cb(null, wallet);
    } catch (err) {
      return cb(err);
    }
  }
}
module.exports = Wallet