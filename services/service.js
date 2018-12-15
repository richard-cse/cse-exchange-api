import jayson from 'jayson'

class Service {
  constructor (name = '', opts) {
    this._client = jayson.Client.http({
      port: 8545
    })
    this._name = name
  }

  getMethod (st) {
    return `${this._name}_${st}`
  }

  fetch (method, params = []) {
    return new Promise((resolve, reject) =>
      this._client.request(this.getMethod(method), params, function (
        err,
        error,
        result
      ) {
        if (err) reject(err)
        if (error) reject(error)
        resolve(result)
      })
    )
  }
}

export default Service
