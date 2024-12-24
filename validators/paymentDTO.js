const { body , param, validationResult} = require('express-validator')

// List of accepted payment methods
const paymentMethods = [
  'credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash', 'apple_pay', 'google_pay', 'crypto', 'check', 'venmo'
];

// Middleware to validate payment data
const validatePayment = [
  // Ensure 'amount' is a float and is not empty
  body('amount')
    .isFloat().withMessage('Payment Amount must be a float number')
    .notEmpty().withMessage('Unable to send empty payment'),

  // Ensure 'date' is a valid date and is not empty
  body('date')
    .isDate().withMessage('Payment date must be a valid date')
    .notEmpty().withMessage('Payment Date must be provided'),

  // Ensure 'method' is one of the accepted payment methods
  body('method')
    .isIn(paymentMethods).withMessage('Must be a valid payment method')
    .notEmpty().withMessage('Payment method must be provided'),
  
  // Check for validation errors and return 400 status if any exist
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }
    next() // Proceed if validation passes
  }
]

// Middleware to validate payment ID parameter
const validatePaymentId = [
  // Ensure 'id' is an integer
  param('id').isInt().withMessage('Id must be valid'),

  // Check for validation errors and return 400 status if any exist
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }
    next() // Proceed if validation passes
  }
]

module.exports = {
  validatePayment, // Export payment validation middleware
  validatePaymentId // Export payment ID validation middleware
}
