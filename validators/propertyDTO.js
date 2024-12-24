const { body , param, validationResult} = require('express-validator')

// Define valid property statuses
const validStatuses = [
  'Available',
  'Pending',
  'Under Contract',
  'Sold',
  'Rented',
  'Reserved',
  'Off Market',
  'Expired',
  'Inactive',
  'Archived'
];

// Middleware to validate property data
const validateProperty = [
  // Validate 'propertyName' to ensure it's a non-empty string
  body('propertyName')
  .isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),

  // Validate 'propertyLocation' to ensure it is not empty
  body('propertyLocation')
  .notEmpty().withMessage('Location is required'),

  // Validate 'propertyStatus' to ensure it's one of the valid statuses
  body('propertyStatus')
  .isIn(validStatuses).withMessage('Status must be valid').notEmpty().withMessage('Status is required'),

  // Validate 'propertyPrice' to ensure it's a valid float
  body('propertyPrice')
  .isFloat().withMessage('Price must be a number').notEmpty().withMessage('Price is required'),

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

// Middleware to validate the 'id' in the URL parameter for property
const validatePropertyId = [
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
  validateProperty,  // Export property validation
  validatePropertyId // Export property ID validation
}
