const moduleList = ['block', 'transaction', 'wallet', 'system-config', 'charts', 'fee', 'deposit']

moduleList.forEach(mod => {
  module.exports[mod] = require(`./${mod}`)
})

module.exports.list = moduleList
