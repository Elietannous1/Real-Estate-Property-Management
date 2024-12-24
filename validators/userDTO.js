const { body , param, validationResult} = require('express-validator')

// Middleware to validate user data during request
const validateUser = [
  // Validate 'name': must be a string and cannot be empty
  body('name')
  .isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),

  // Validate 'email': must be a valid email address and cannot be empty
  body('email')
  .isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required'),

  // Password validation is removed due to hashing, hence this line is commented out
  //body('password')
  //.isStrongPassword().withMessage('Password must be strong').notEmpty().withMessage('Password is required'),

  // 'location' is optional, no validation required
  body('location')
  .optional(),

  // Check for validation errors and return them in the response if any
  (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
      }
      next() // Proceed if validation passes
  }
]

// Middleware to validate the user ID from the URL parameters
const validateUserId = [
  // Validate that the 'id' parameter is a valid integer
  param('id').isInt().withMessage('User Id must be valid'),

  // Check for validation errors and return them in the response if any
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }
    next() // Proceed if validation passes
  }
]

module.exports = {
  validateUser,  // Export user validation middleware
  validateUserId // Export user ID validation middleware
}
