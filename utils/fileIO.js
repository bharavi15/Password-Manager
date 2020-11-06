const filename = './.passMan.db'
const fs = require('fs')
const fsPromises = fs.promises
const {
  encryptData,
  decryptData
} = require('./encryption')

const writeFile = async function (data) {
  const key = global.enc_key
  fs.existsSync(filename) && fs.chmodSync(filename, '4777')
  const encryptedText = encryptData(key, JSON.stringify(data))
  await fsPromises.writeFile(filename, encryptedText, 'utf-8')
  fs.chmodSync(filename, '4400')
  return true
}

const readFile = async function () {
  const key = global.enc_key
  const fsdata = await fsPromises.readFile(filename, 'utf-8')
  const decryptedData = JSON.parse(decryptData(key, fsdata))
  return decryptedData
}
const checkFileExists = function () {
  return fs.existsSync(filename)
}

module.exports = {
  writeFile,
  readFile,
  checkFileExists
}
