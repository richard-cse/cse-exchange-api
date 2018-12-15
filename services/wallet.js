import Service from "./service";
class WalletService extends Service {
  constructor() {
    super("wallet", {});
  }
  createWallet(coinAsset, userId, contractAddress, address) {
    return this.fetch("createWallet", [
      coinAsset,
      userId,
      contractAddress,
      address
    ]);
  }
  getWalletByAddress(address) {
    return this.fetch("getWalletByAddress", [address]);
  }
}

export default WalletService;
