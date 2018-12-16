import Service from './service'
class WalletService extends Service {
  constructor () {
    super('wallet', {})
  }
  createWallet (coinAsset, userId, address, contractAddress) {
    return this.fetch('createWallet', [
      coinAsset,
      userId,
      address,
      contractAddress
    ])
  }
  getWalletByAddress (address) {
    return this.fetch('getWalletByAddress', [address])
  }
}

export default WalletService
