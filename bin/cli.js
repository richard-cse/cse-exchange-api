require('../utils/complier')
const { randomBytes } = require('crypto')
const { getLogger } = require('../utils/logging')
const jayson = require('jayson')
const RPCManager = require('../rpc/manager')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
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
      default: 1010
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
  const app = express()
  // pass headers to methods
  app.use(bodyParser.json())
  app.use(cors())

  app.use(function (req, res, next) {
    // decorate the request with header params or whatever other contextual values are desired
    const authorization = req.headers['authorization']
    const APIKey = req.headers['apikey']
    const APISecret = req.headers['apisecret']
    if (
      APIKey &&
      APISecret &&
      req.body.params &&
      typeof req.body.params === 'object'
    ) {
      const options = {
        APIKey,
        APISecret
      }
      if (authorization) options.authorization = authorization
      req.body.params.push(options)
    }
    next()
  })
  app.use(server.middleware())

  app.listen(rpcport)
  logger.info(`RPC HTTP endpoint opened: http://${rpcaddr}:${rpcport}`)
}

async function run () {
  const options = {
    logger: logger,
    localPort: args.port,
    rpcport: args.rpcport,
    rpcaddr: args.rpcaddr
  }
  //
  runRpcServer(options)
}

run().catch(err => logger.error(err))
