/*
  The transactionRoute class defines the routes for managing transactions.
  Validators ensure that the data provided for each request is valid.
*/

const express = require('express');
const transactionController = require('../controllers/transactionController');
const { validateTransaction, validateTransactionId } = require('../validators/transactionDTO');
const router = express.Router();

// Route to get all transactions
// Calls the getAllTransactions method in the transactionController.
router.get('/', (req, res) => transactionController.getAllTransactions(req, res));

// Route to get a specific transaction by ID
// Calls the getTransactionsById method in the transactionController with validation for the ID.
router.get('/:id', validateTransactionId, (req, res) => transactionController.getTransactionsById(req, res));

// Route to create a new transaction
// Calls the createTransactions method in the transactionController, with validation for the data.
router.post('/', validateTransaction, (req, res) => transactionController.createTransactions(req, res));

// Route to update an existing transaction by ID
// Calls the updateTransactions method in the transactionController, with validation for the data and ID.
//router.put('/:id', [validateTransaction, validateTransactionId], (req, res) => transactionController.updateTransactions(req, res));
router.post('/update/transaction/:id', [validateTransaction, validateTransactionId], (req, res) => transactionController.updateTransactions(req, res));

// Route to delete a transaction by ID
// Calls the deleteTransactions method in the transactionController with validation for the ID.
//router.delete('/:id', validateTransactionId, (req, res) => transactionController.deleteTransactions(req, res));
router.get('/delete/transaction/:id', validateTransactionId, (req, res) => transactionController.deleteTransactions(req, res));

module.exports = router;
