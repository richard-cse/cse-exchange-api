import Service from './service'
class FeeService extends Service {
  constructor () {
    super('fee', {})
  }
  getPriceByCSE () {
    return this.fetch('getPriceByCSE', [])
  }
  getFeeByCoin () {
    return this.fetch('getFeeByCoin', [])
  }
}
export default FeeService
