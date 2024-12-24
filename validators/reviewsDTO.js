const { body , param, validationResult} = require('express-validator')

// Middleware to validate review data
const validateReviews = [
  // Validate 'comment': optional but must be a string if provided
  body('comment')
  .optional()
  .isString()
  .withMessage('Comments need to be a String'),

  // Validate 'rating': must be a number between 1 and 5
  body('rating')
  .isNumeric()
  .custom((value) => value >= 1 && value <= 5)
  .withMessage('Rating must be a number between 1 and 5'),

  // Error handling: if validation fails, return 400 with errors
  (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
      }
      next() // Proceed if no errors
  }
]

// Middleware to validate the 'id' parameter for reviews
const validateReviewsId = [
  // Validate 'id' to be a valid integer
  param('id').isInt().withMessage('Id must be valid'),

  // Error handling: if validation fails, return 400 with errors
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }
    next() // Proceed if no errors
  }
]

module.exports = {
  validateReviews,  // Export review validation
  validateReviewsId // Export review ID validation
}
