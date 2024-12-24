const { body , param, validationResult} = require('express-validator')

// Validation middleware for agent creation/updating
const validateAgent = [
  // Validates 'name' field as a non-empty string
  body('name')
  .isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),

  // Validates 'email' field as a valid email and ensures it's not empty
  body('email')
  .isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required'),

  // Removed password validation since password is hashed
  //(body('password').isStrongPassword().withMessage('Password must be strong').notEmpty().withMessage('Password is required')),

  // Checks if there are any validation errors and returns them in the response
  (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }) // Respond with error messages if validation fails
      }
      next() // Proceed to next middleware if validation passes
  }
]

// Validation middleware for agent ID parameter
const validateAgentId = [
  // Validates that the 'id' param is an integer
  param('id').isInt().withMessage('Agent Id must be valid'),

  // Checks for validation errors and returns them if any are found
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() }) // Respond with error messages if validation fails
    }
    next() // Proceed if validation passes
  }
]

module.exports = {
  validateAgent, // Export the agent validation middleware
  validateAgentId // Export the agent ID validation middleware
}
