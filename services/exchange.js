import Service from './service'
class ExchangeService extends Service {
  constructor () {
    super('exchange', {})
  }
  checkExchange (apiKey, apiSecret) {
    return this.fetch('checkExchange', [apiKey, apiSecret])
  }
}
export default ExchangeService
