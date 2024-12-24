/*
  The paymentRoute class defines the routes for managing payments.
  Validators are used to ensure that the data provided is valid for each request.
*/

const express = require('express');
const paymentController = require('../controllers/paymentController');
const { validatePayment, validatePaymentId } = require('../validators/paymentDTO');
const router = express.Router();

// Route to get all payments
// Calls the getAllPayments method in the paymentController to retrieve all payment records.
router.get('/', (req, res) => paymentController.getAllPayments(req, res));

// Route to get a specific payment by ID
// Calls the getPaymentById method in the paymentController, with validation for the payment ID.
router.get('/:id', validatePaymentId, (req, res) => paymentController.getPaymentById(req, res));

// Route to create a new payment
// Calls the createPayment method in the paymentController, with validation for the provided payment data.
router.post('/', validatePayment, (req, res) => paymentController.createPayment(req, res));

// Route to update an existing payment
// Calls the updatePayment method in the paymentController, with validation for the payment ID and data.
//router.put('/:id', [validatePayment, validatePaymentId], (req, res) => paymentController.updatePayment(req, res));
router.post('/update/payment/:id', [validatePayment, validatePaymentId], (req, res) => paymentController.updatePayment(req, res));

// Route to delete a payment by ID
// Calls the deletePayment method in the paymentController, with validation for the payment ID.
//router.delete('/:id', validatePaymentId, (req, res) => paymentController.deletePayment(req, res));
router.get('/delete/payment/:id', validatePaymentId, (req, res) => paymentController.deletePayment(req, res));

module.exports = router;
