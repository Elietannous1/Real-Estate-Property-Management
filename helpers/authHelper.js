const bcrypt = require('bcrypt')

// Function to hash the provided password
// The '10' represents the number of salt rounds for bcrypt to use, which adds complexity to the hash
async function hashPassword(providedPassword){
  return bcrypt.hash(providedPassword, 10) // Hashes the password and returns the hashed value
}

// Function to check if the provided password matches the hashed password
// Compares the plain text password with the hashed version stored in the database
async function checkPassword(providedPassword, hashedPassword){
  return bcrypt.compare(providedPassword, hashedPassword) // Returns true if passwords match, otherwise false
}

module.exports = { hashPassword, checkPassword }

