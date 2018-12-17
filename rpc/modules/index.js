const moduleList = ['transaction', 'wallet', 'price']

moduleList.forEach(mod => {
  module.exports[mod] = require(`./${mod}`)
})

module.exports.list = moduleList
