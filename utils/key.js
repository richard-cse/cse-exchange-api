import KeyEthereum from 'keythereum'
import EthUtil from './eth-util'
// import moment from 'moment'
import secp256k1 from 'secp256k1'

const dumpOptions = {
  kdf: 'pbkdf2',
  cipher: 'aes-128-ctr',
  kdfparams: {
    c: 262144,
    dklen: 32,
    prf: 'hmac-sha256'
  }
}

export function createPrivateKey () {
  const params = { keyBytes: 32, ivBytes: 16 }
  // synchronous
  return KeyEthereum.create(params)
}

export function getAddressFromPrivateKey (privateKey) {
  let publiceKey = secp256k1.publicKeyCreate(privateKey, false).slice(1)
  let address = EthUtil.pubToAddress(publiceKey, true)
  return address
}

export function createObjectKeyFromPrivateKey (dk, password) {
  return KeyEthereum.dump(password, dk.privateKey, dk.salt, dk.iv, dumpOptions)
}

export function privateKeyToJson (pk) {
  let obj = {}
  Object.keys(pk).forEach(key => (obj[key] = pk[key].toString('hex')))
  return obj
}

export function privateKeyToAddress (privateKey) {
  let address = KeyEthereum.privateKeyToAddress(privateKey).substring(2)
  address = address.slice(-23)
  address = 'CSE' + address.toUpperCase()
  return address
}
