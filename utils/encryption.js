const crypto = require('crypto')
const pbkdf2 = require('pbkdf2')
const aesAlgo = 'aes-256-gcm'
const IVlength = 16
const encryptData = function (key, plainText) {
  const IV = generateRandom(IVlength)
  const encryptor = crypto.createCipheriv(aesAlgo, key, IV)
  const encrypted = Buffer.concat([encryptor.update(plainText, 'utf8'), encryptor.final()])
  const cipherText = Buffer.concat([IV, encryptor.getAuthTag(), encrypted])
  return cipherText.toString('base64')
}

const decryptData = function (key, base64cipherText) {
  const buff = Buffer.from(base64cipherText, 'base64')
  const IV = buff.slice(0, IVlength)
  const tag = buff.slice(IVlength, IVlength * 2)
  const cipherText = buff.slice(IVlength * 2)
  const decryptor = crypto.createDecipheriv(aesAlgo, key, IV)
  decryptor.setAuthTag(tag)
  const plainText = decryptor.update(cipherText, 'binary', 'utf8') + decryptor.final('utf8')
  return plainText
}

function generateRandom (len) {
  return crypto.randomBytes(len)
}

function generateKey (text, keylen = 16) {
  return pbkdf2.pbkdf2Sync(text, text, 2048, keylen, 'sha512').toString('hex')
}
module.exports = {
  generateRandom,
  generateKey,
  encryptData,
  decryptData
}
