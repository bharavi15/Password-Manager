const {
  readFile,
  writeFile,
  checkFileExists
} = require('./fileIO')
const {
  generateRandom,
  generateKey
} = require('./encryption')
const passwords = []
let dataWithPassword = {
  adminPassword: '',
  passwords
}
const SUCCESS_STATUS = 'success'
const FAILED_STATUS = 'failed'
const readAll = async function () {
  try {
    dataWithPassword = await readFile()
    const dataToBeSent = {
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
const addOne = async function (args) {
  try {
    const obj = dataWithPassword.passwords.find(x => (x.service === args.service && x.username === args.username))
    const id = Date.now() + '-' + generateRandom(5).toString('hex')
    const index = dataWithPassword.passwords.indexOf(obj)
    if (index < 0) {
      dataWithPassword.passwords.push({
        id,
        ...args
      })
      await writeAll()
      return {
        status: SUCCESS_STATUS,
        message: 'Service added successfully!'
      }
    } else {
      throw new Error('Username already exists!')
    }
  } catch (error) {
    return {
      status: FAILED_STATUS,
      message: error.message
    }
  }
}

const deleteOne = async function (id) {
  try {
    const obj = dataWithPassword.passwords.find(x => x.id === id)
    const index = dataWithPassword.passwords.indexOf(obj)
    if (index >= 0) {
      dataWithPassword.passwords.splice(index, 1)
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
    dataWithPassword.passwords = []
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
    dataWithPassword.adminPassword = generateKey(adminPass, 32)
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
  return (generateKey(adminPass, 32) === dataWithPassword.adminPassword)
}

const checkIfPasswordExists = function () {
  return dataWithPassword.adminPassword.length > 0
}
const checkIfDbExists = function () {
  return checkFileExists()
}
module.exports = {
  readAll,
  writeAll,
  addOne,
  deleteOne,
  createAdminPassword,
  checkAdminPassword,
  deleteAll,
  checkIfPasswordExists,
  checkIfDbExists
}
