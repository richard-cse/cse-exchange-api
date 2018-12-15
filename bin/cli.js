require('../utils/complier')
const { randomBytes } = require('crypto')
const { getLogger } = require('../utils/logging')
const jayson = require('jayson')
const RPCManager = require('../rpc/manager')
const connectMongoDB = require('../db/mongo')
const Miner = require('../miner/main')

const args = require('yargs')
  .options({
    rpc: {
      describe: 'Enable the JSON-RPC server',
      boolean: true,
      default: true
    },
    rpcport: {
      describe: 'HTTP-RPC server listening port',
      number: true,
      default: 8545
    },
    rpcaddr: {
      describe: 'HTTP-RPC server listening interface',
      default: 'localhost'
    },
    loglevel: {
      describe: 'Logging verbosity',
      choices: ['error', 'warn', 'info', 'debug'],
      default: 'info'
    },
    key: {
      describe: '32-byte hex string to generate key pair from',
      default: 'random',
      coerce: key =>
        key.length === 64 ? Buffer.from(key, 'hex') : randomBytes(32)
    },
    miner: {
      describe: 'Enable Miner',
      boolean: true,
      default: false
    }
  })
  .locale('en_EN').argv

const logger = getLogger({ loglevel: args.loglevel })

function runRpcServer (options) {
  const { rpcport, rpcaddr } = options
  const manager = new RPCManager(options)
  const server = jayson.server(manager.getMethods())
  logger.info(`RPC HTTP endpoint opened: http://${rpcaddr}:${rpcport}`)
  server.http().listen(rpcport)
}

async function run () {
  const options = {
    logger: logger,
    localPort: args.port,
    rpcport: args.rpcport,
    rpcaddr: args.rpcaddr,
    privateKey: args.key
  }
  //
  await connectMongoDB(logger)
  //
  runRpcServer(options)
}

run().catch(err => logger.error(err))
