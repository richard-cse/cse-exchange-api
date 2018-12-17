import Service from './service'
class WalletService extends Service {
  constructor () {
    super('wallet', {})
  }
  createExchangeWallet (apiKey, apiSecret) {
    return this.fetch('createExchangeWallet', [apiKey, apiSecret])
  }
  getWalletByAddress (address) {
    return this.fetch('getWalletByAddress', [address])
  }
}

export default WalletService
