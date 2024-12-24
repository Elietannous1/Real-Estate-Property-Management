const { body , param, validationResult} = require('express-validator')

// Middleware to validate message data
const validateMessage = [
  // Ensure 'content' field is not empty
  body('content')
    .notEmpty().withMessage('Unable to send empty message'), // Return an error if 'content' is empty

  // Check for validation errors and return 400 status if any exist
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() }) // Respond with errors if validation fails
    }
    next() // Proceed if validation passes
  }
]

// Middleware to validate the message ID parameter
const validateMessageId = [
  // Ensure that 'id' is an integer
  param('id').isInt().withMessage('Id must be valid'),

  // Check for validation errors and return 400 status if any exist
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() }) // Respond with errors if validation fails
    }
    next() // Proceed if validation passes
  }
]

module.exports = {
  validateMessage, // Export message data validation middleware
  validateMessageId // Export message ID validation middleware
}
