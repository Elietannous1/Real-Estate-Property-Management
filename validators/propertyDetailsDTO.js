const { body , param, validationResult} = require('express-validator')

// Middleware to validate the property details
const validatePropertyDetails = [
  // Validate that 'bedroom' is an integer
  body('bedroom')
  .isInt().withMessage('Bedroom count must be an integer'),

  // Validate that 'bathroom' is an integer
  body('bathroom')
  .isInt().withMessage('Bathroom count must be an integer'),

  // Validate that 'garden' is an integer
  body('garden')
  .isInt().withMessage('garden count must be an integer'),

  // Validate that 'gardenArea' is an integer
  body('gardenArea')
  .isInt().withMessage('garden area must be an integer'),

  // Error handling middleware: checks if validation failed
  (req, res, next) => {
      const errors = validationResult(req);
      // If there are validation errors, send a 400 response with the errors
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
      }
      next() // Proceed to next middleware if no errors
  }
]

// Middleware to validate the 'id' in the URL parameter for property details
const validatePropertyDetailsId = [
  // Validate that 'id' parameter is a valid integer
  param('id').isInt().withMessage('Id must be valid'),

  // Error handling middleware: checks if validation failed
  (req, res, next) => {
    const errors = validationResult(req)
    // If there are validation errors, send a 400 response with the errors
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }
    next() // Proceed to next middleware if no errors
  }
]

module.exports = {
  validatePropertyDetails,  // Export property details validation
  validatePropertyDetailsId // Export property details ID validation
}
