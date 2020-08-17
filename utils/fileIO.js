const filename = "./.passMan.db"
const fs = require('fs');
const {
	encryptData,
	decryptData
} = require('./encryption')

const crypto = require('crypto');
const encryptionKey = process.env.ENCRYPTION_KEY || "MyDefaultKey"
const hash = crypto.createHash('sha256')
const key = hash.update(encryptionKey).digest('hex').slice(0, 32);

const writeFile = async function (data) {
	if (fs.existsSync(filename))
		await fs.chmodSync(filename, "4777")
	const encryptedText = encryptData(key, JSON.stringify(data))
	await fs.writeFileSync(filename, encryptedText, 'utf-8')
	await fs.chmodSync(filename, "4400")
	return true
}

const readFile = async function () {
	const fsdata = fs.readFileSync(filename, 'utf-8')
	const decryptedData = JSON.parse(decryptData(key, fsdata))
	return decryptedData
}
module.exports = {
	writeFile,
	readFile
}