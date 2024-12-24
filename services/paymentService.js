// Importing required modules
const { initDB } = require('../config/database'); // Database initialization function
const payment = require('../models/paymentModel'); // Payment model for handling payment data

// PaymentService class for handling payment-related operations
class PaymentService {
  constructor() {
    this.pool = null;  // Initializes the pool property to null
    this.init();  // Calls the init method to set up the database connection
  }

  // Initializes the database connection
  async init() {
    this.pool = await initDB();  // Sets up the database connection pool
  }

  // Retrieves all payments from the database
  async getAllPayments() {
    const [rows] = await this.pool.query('SELECT * FROM payment');  // Executes the query to fetch all payments
    return rows.map(payment.fromRow);  // Maps each row to a payment object using the fromRow method
  }

  // Retrieves a specific payment by its ID
  async getPaymentById(id) {
    const [rows] = await this.pool.query('SELECT * FROM payment WHERE payment_id = ?', [id]);  // Fetches payment by ID
    if (rows.length === 0) return null;  // If no payment is found, return null
    return payment.fromRow(rows[0]);  // Maps the first row to a payment object and returns it
  }

  // Creates a new payment entry in the database
  async createPayment(amount, date, method, transactionId) {
    const [result] = await this.pool.query(
      'INSERT INTO payment (payment_amount, payment_date, payment_method, transaction_id) VALUES (?, ?, ?, ?)', 
      [amount, date, method, transactionId]  // Inserts payment details into the database
    );
    const insertedPayment = new payment(result.insertId, amount, date, method, transactionId);  // Creates a new payment object with the inserted ID
    return insertedPayment;  // Returns the newly created payment object
  }

  // Updates an existing payment entry in the database
  async updatePayment(id, amount, date, method, transactionId) {
    const [result] = await this.pool.query(
      'UPDATE payment SET payment_amount = ?, payment_date = ?, payment_method = ?, transaction_id = ? WHERE payment_id = ?',
      [amount, date, method, transactionId, id]  // Executes the query to update the payment details
    );
    return result.affectedRows > 0;  // Returns true if the update was successful, otherwise false
  }

  // Deletes a payment entry by its ID
  async deletePayment(id) {
    const [result] = await this.pool.query('DELETE FROM payment WHERE payment_id = ?', [id]);  // Deletes the payment by ID
    return result.affectedRows > 0;  // Returns true if the deletion was successful, otherwise false
  }
}

// Exports an instance of the PaymentService class
module.exports = new PaymentService();
