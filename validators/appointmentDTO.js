const { body , param, validationResult} = require('express-validator')

// Valid appointment statuses for validation
const validStatuses = [
  'Pending',
  'Confirmed',
  'Canceled',
  'Rescheduled',
  'Completed',
  'No-Show',
  'In Progress'
];

// Middleware to validate appointment data
const validateAppointment = [
  // Validates that 'date' is a valid date and follows the ISO 8601 format
  body('date')
    .isDate().withMessage('Appointment date must be a valid date')
    .isISO8601().withMessage('Appointment date must have valid format'),

  // Validates that 'status' is one of the predefined valid statuses
  body('status')
    .isIn(validStatuses).withMessage('Appointment status must be a valid status'),

  // Checks for validation errors and responds with 400 if any are found
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() }) // Respond with errors if validation fails
    }
    next() // Proceed to the next middleware if validation passes
  }
]

// Middleware to validate appointment ID parameter
const validateAppointmentId = [
  // Validates that the 'id' param is an integer
  param('id').isInt().withMessage('Appointment Id must be valid'),

  // Checks for validation errors and responds with 400 if any are found
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() }) // Respond with errors if validation fails
    }
    next() // Proceed if validation passes
  }
]

module.exports = {
  validateAppointment, // Export appointment validation middleware
  validateAppointmentId // Export appointment ID validation middleware
}
