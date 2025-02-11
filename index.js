const crypto = require('crypto')

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genRandomString = function(length) {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length) /** return required number of characters */
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const sha512 = function(password, salt){
  let hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
  hash.update(password)
  return {
    salt: salt,
    passwordHash: hash.digest('hex')
  }
}

/**
 * generates hash password
 * @function
 * @param {string} userpassword - List of required fields.
 */
function saltHashPassword(userpassword) {
  var salt = genRandomString(32) /** Gives us salt of length 32 */
  var passwordData = sha512(userpassword, salt)
  console.log('UserPassword = '+userpassword)
  console.log('Passwordhash = '+passwordData.passwordHash)
  console.log('Salt Key = '+passwordData.salt)
}

/**
 * Main function
 * @function
 */
(async () => {
  try {
    saltHashPassword('PRIVATE')
  } catch(err) {
    console.log(err)
  }
})()