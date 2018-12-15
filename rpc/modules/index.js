const moduleList = ["transaction", "wallet", "fee"];

moduleList.forEach(mod => {
  module.exports[mod] = require(`./${mod}`);
});

module.exports.list = moduleList;
