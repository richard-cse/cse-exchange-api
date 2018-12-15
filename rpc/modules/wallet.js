import WalletService from "../../services/wallet";
import { validators, middleware } from "../validation";
import ErrorCode from "../error-code";
import * as Key from "../../utils/key";

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
      const pk = await Key.createPrivateKey();
      let address = Key.privateKeyToAddress(pk.privateKey)
      let wallet = await this._wallet.createWallet(
        'CSE',
        null,
        address,
        null
      );
      delete wallet._id;
      delete wallet.__v;
      return cb(null, { pk, wallet });
    } catch (err) {
      return cb(err);
    }
  }
}
module.exports = Wallet;
