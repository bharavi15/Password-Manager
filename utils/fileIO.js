const filename = "./.passMan.db"
const fs = require('fs');
const fsPromises = fs.promises
const {
	encryptData,
	decryptData
} = require('./encryption')

const crypto = require('crypto');
let key = ""
const writeFile = async function (data) {
	if (key === "")
		key = getKey();
	if (fs.existsSync(filename))
		fs.chmodSync(filename, "4777")
	const encryptedText = encryptData(key, JSON.stringify(data))
	await fsPromises.writeFile(filename, encryptedText, 'utf-8')
	fs.chmodSync(filename, "4400")
	return true
}

const readFile = async function () {
	if (key === "")
		key = getKey();
	const fsdata = await fsPromises.readFile(filename, 'utf-8')
	const decryptedData = JSON.parse(decryptData(key, fsdata))
	return decryptedData
}
const checkFileExists = function () {
	return fs.existsSync(filename)
}

const getKey = function () {
	const hash = crypto.createHash('sha256')
	return hash.update(global.enc_key).digest('hex').slice(0, 32);
}
module.exports = {
	writeFile,
	readFile,
	checkFileExists
}