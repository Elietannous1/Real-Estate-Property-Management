const { body , param, validationResult} = require('express-validator')

// Middleware to validate appointment details
const validateAppointmentDetails = [
  // Checks if there are any validation errors and returns them if any are found
  (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }) // Respond with error messages if validation fails
      }
      next() // Proceed to next middleware if validation passes
  }
]

// Middleware to validate appointment details ID parameter
const validateAppointmentDetailsId = [
  // Validates that the 'id' param is an integer
  param('id').isInt().withMessage('AppointmentDetails Id must be valid'),

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
  validateAppointmentDetails, // Export the appointment details validation middleware
  validateAppointmentDetailsId // Export the appointment details ID validation middleware
}
