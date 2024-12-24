// controllers/paymentController.js
const paymentService = require('../services/paymentService');

class PaymentController {
    
  // Fetch all payments from the payment service
  async getAllPayments(req, res) {
    try {
      const payment = await paymentService.getAllPayments();
      console.log(payment)
      //res.json(payment); // Return all payments as a JSON response
      res.render('payments', {payment: payment})
    } catch (error) {
      console.error('Error fetching payment:', error);
      //res.status(500).json({ payment: 'Internal server error' }); // Handle error and return 500 status
      res.render('500')
    }
  }

  // Fetch a payment by its unique ID from the payment service
  async getPaymentById(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Get ID from request params
      const payment = await paymentService.getPaymentById(id); // Fetch payment by ID
      res.json(payment); // Return the payment details as a JSON response
    } catch (error) {
      console.error('Error fetching payment:', error);
      res.status(500).json({ payment: 'Internal server error' }); // Handle error and return 500 status
    }
  }

  // Create a new payment record using data from the request body
  async createPayment(req, res) {
    try {
      const { amount, date, method, transactionId } = req.body; // Destructure request body
      const newPayment = await paymentService.createPayment(amount, date, method, transactionId); // Create new payment
      res.status(201).json(newPayment); // Return the created payment with a 201 status
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ payment: 'Internal server error' }); // Handle error and return 500 status
    }
  }

  // Update an existing payment record using data from the request body
  async updatePayment(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Get ID from request params
      const { amount, date, method, transactionId } = req.body; // Destructure request body
      const success = await paymentService.updatePayment(id, amount, date, method, transactionId); // Update payment
      res.json({ message: 'Payment updated successfully' }); // Return success message
    } catch (error) {
      console.error('Error updating payment:', error);
      res.status(500).json({ payment: 'Internal server error' }); // Handle error and return 500 status
    }
  }

  // Delete a payment record by its ID
  async deletePayment(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Get ID from request params
      const success = await paymentService.deletePayment(id); // Delete payment
      res.json({ payment: 'Payment deleted successfully' }); // Return success message
    } catch (error) {
      console.error('Error deleting payment:', error);
      res.status(500).json({ payment: 'Internal server error' }); // Handle error and return 500 status
    }
  }
}

module.exports = new PaymentController();
