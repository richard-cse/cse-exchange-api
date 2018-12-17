class Webhook {
  constructor (opts) {
    this._logger = opts.logger
  }
  async demoWebhook (params, cb) {
    try {
      console.log({
        type: 'TRANSACTION_SUCCESS',
        data: {
          txId:
            '027942e9116817ef99a7098bf0cf55253a9f38a542c6f2acfe01860eadeb5cbf',
          id: '5c175d308e2f8f3914ae87ed',
          fromAddress: 'CSE52BA77F97FFF100947DC93B',
          toAddress: 'CSEbe2d079a5d1875b65f5f471',
          coinAsset: 'CSE',
          amount: 0.1
        }
      })
      cb(null)
    } catch (err) {
      cb(err)
    }
  }
}
module.exports = Webhook
