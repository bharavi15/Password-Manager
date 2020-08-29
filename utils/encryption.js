const crypto = require('crypto');
const aesAlgo = 'aes-256-cbc';
const encryptData = function (key, plainText) {
	var cipherText;
	const IV = generateRandom(16);
	const encryptor = crypto.createCipheriv(aesAlgo, key, IV);
	encryptor.setEncoding('base64');
	encryptor.write(plainText, 'utf-8');
	encryptor.end();
	cipherText = encryptor.read();

	cipherText = IV + cipherText
	let buff = Buffer.from(cipherText, 'ascii');
	let base64cipherText = buff.toString('base64');
	return base64cipherText;
};

const decryptData = function (key, base64cipherText) {
	var plainText;
	let buff = Buffer.from(base64cipherText, 'base64');
	let cipherText = buff.toString('ascii');

	const IV = cipherText.slice(0, 16)
	cipherText = cipherText.slice(16)
	const decryptor = crypto.createDecipheriv(aesAlgo, key, IV);
	decryptor.setEncoding('utf-8');
	decryptor.write(cipherText, 'base64');
	decryptor.end();
	plainText = decryptor.read();
	return plainText;
};

function generateRandom(len) {
	let str = "";
	let j;
	for (j = 0; j < len; j++) {
		str += Math.floor(Math.random() * 10) % 10;
	}
	return str;
}
module.exports = {
	generateRandom,
	encryptData,
	decryptData
}