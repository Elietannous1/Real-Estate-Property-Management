const { body , param, validationResult} = require('express-validator')

// Define valid transaction types
const transactionTypes = [
  'purchase', 
  'sale',
  'rent', 
  'lease',
  'exchange', 
  'refund', 
  'transfer'
]

// Middleware to validate transaction data
const validateTransaction = [
  // Validate 'type': must be one of the predefined transaction types
  body('type')
  .isIn(transactionTypes)
  .withMessage('Invalid transaction type!'),

  // Validate 'price': must be a valid float and not empty
  body('price')
  .isFloat()
  .withMessage('price must be a valid number')
  .notEmpty()
  .withMessage('Transaction price must be provided'),
  
  // Validate 'date': must be a valid date
  body('date')
  .isDate()
  .withMessage('Transaction date must be a valid date'),

  // Error handling: if validation fails, return 400 with errors
  (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
      }
      next() // Proceed if no errors
  }
]

// Middleware to validate the 'id' parameter for transactions
const validateTransactionId = [
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
  validateTransaction,  // Export transaction validation
  validateTransactionId // Export transaction ID validation
}
