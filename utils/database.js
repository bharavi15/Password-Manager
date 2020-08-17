const {
	readFile,
	writeFile
} = require('./fileIO')
const bcrypt = require('bcryptjs')
var passwords = []
var dataWithPassword = {
	adminPassword: '',
	passwords
}
const SUCCESS_STATUS = 'success',
	FAILED_STATUS = 'failed'
const readAll = async function () {
	try {
		dataWithPassword = await readFile()
		var dataToBeSent = {
			...dataWithPassword
		}
		delete dataToBeSent.adminPassword
		return {
			status: SUCCESS_STATUS,
			data: dataToBeSent
		}
	} catch (error) {
		return {
			status: FAILED_STATUS,
			message: error.message
		}
	}
}
const writeAll = async function () {
	try {
		await writeFile(dataWithPassword)
		return true
	} catch (error) {
		return {
			status: FAILED_STATUS,
			message: error.message
		}
	}
}
const addOne = async function (service, password) {
	try {
		let obj = dataWithPassword.passwords.find(x => x.service === service);
		let index = dataWithPassword.passwords.indexOf(obj);
		if (index < 0) {
			dataWithPassword.passwords.push({
				service,
				password
			})
			await writeAll()
			return {
				status: SUCCESS_STATUS,
				message: 'Service added successfully!'
			}
		} else {
			throw new Error('Service name already exists!')
		}
	} catch (error) {
		return {
			status: FAILED_STATUS,
			message: error.message
		}
	}
}

const deleteOne = async function (service) {
	try {
		let obj = dataWithPassword.passwords.find(x => x.service === service);
		let index = dataWithPassword.passwords.indexOf(obj);
		if (index >= 0) {
			dataWithPassword.passwords.splice(index, 1);
			await writeAll()
			return {
				status: SUCCESS_STATUS,
				message: 'Service deleted successfully!'
			}
		} else {
			throw new Error('Service not found')
		}
	} catch (error) {
		return {
			status: FAILED_STATUS,
			message: error.message
		}
	}
}
const deleteAll = async function () {
	try {
		dataWithPassword.passwords = [];
		await writeAll()
		return {
			status: SUCCESS_STATUS,
			message: 'All Services deleted successfully!'
		}
	} catch (error) {
		return {
			status: FAILED_STATUS,
			message: error.message
		}
	}
}
const createAdminPassword = async function (adminPass) {
	try {
		dataWithPassword.adminPassword = bcrypt.hashSync(adminPass, 8)
		await writeAll()
		return {
			status: SUCCESS_STATUS,
			message: 'Password saved successfully!'
		}
	} catch (error) {
		return {
			status: FAILED_STATUS,
			message: error.message
		}
	}
}

const checkAdminPassword = function (adminPass) {
	return bcrypt.compareSync(adminPass, dataWithPassword.adminPassword)
}

const checkIfPasswordExists = function () {
	return dataWithPassword.adminPassword.length > 0
}
module.exports = {
	readAll,
	writeAll,
	addOne,
	deleteOne,
	createAdminPassword,
	checkAdminPassword,
	deleteAll,
	checkIfPasswordExists
}