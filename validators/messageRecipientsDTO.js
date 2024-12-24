const { body , param, validationResult} = require('express-validator')

// Middleware to validate message recipient data
const validateMessageRecipients = [
  // Check for validation errors and return 400 status if any exist
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() }) // Respond with errors if validation fails
    }
    next() // Proceed if validation passes
  }
]

// Middleware to validate the message recipient ID parameter
const validateMessageRecipientsId = [
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
  validateMessageRecipients, // Export message recipients data validation middleware
  validateMessageRecipientsId // Export message recipients ID validation middleware
}
