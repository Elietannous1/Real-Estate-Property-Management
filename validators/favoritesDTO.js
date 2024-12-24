const { body , param, validationResult} = require('express-validator')

// Middleware to validate favorite data
const validateFavorites = [
  // 'note' field is optional; no validation required if it's provided
  body('note')
    .optional(), // Allow 'note' to be omitted or provided without validation

  // Check for validation errors and return 400 status if any exist
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() }) // Respond with errors if validation fails
    }
    next() // Proceed to next middleware if validation passes
  }
]

// Middleware to validate the favorite ID parameter
const validateFavoritesId = [
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
  validateFavorites, // Export favorites data validation middleware
  validateFavoritesId // Export favorites ID validation middleware
}
