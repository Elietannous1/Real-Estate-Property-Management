// Importing required modules
const { initDB } = require('../config/database');  // Initializes the database connection
const transaction = require('../models/transactionModel');  // Importing transaction model

// TransactionService class for handling transaction-related operations
class TransactionService {
  constructor() {
    this.pool = null;  // Initializes the pool property to null
    this.init();  // Calls init method to set up the database connection
  }

  // Initializes the database connection
  async init() {
    this.pool = await initDB();  // Sets up the database connection pool
  }

  // Retrieves all transactions from the database
  async getAllTransaction() {
    const [rows] = await this.pool.query('SELECT * FROM transaction');  // Fetches all transactions
    return rows.map(transaction.fromRow);  // Maps each row to a transaction object
  }

  // Retrieves a transaction by its ID
  async getTransactionById(id) {
    const [rows] = await this.pool.query('SELECT * FROM transaction WHERE transaction_id = ?', [id]);  // Fetches a transaction by its ID
    if (rows.length === 0) return null;  // If no transaction is found, return null
    return transaction.fromRow(rows[0]);  // Maps the row to a transaction object
  }

  // Creates a new transaction in the database
  async createTransaction(date, type, price, userId, agentId, propertyId) {
    const [result] = await this.pool.query(
      'INSERT INTO transaction (transaction_date, transaction_type, transaction_price, user_id, agent_id, property_id) VALUES (?, ?, ?, ?, ?, ?)',
      [date, type, price, userId, agentId, propertyId]  // Executes the query to insert the transaction
    );
    const insertedTransaction = new transaction(result.insertId, date, type, price, userId, agentId, propertyId);  // Creates a new transaction object
    return insertedTransaction;  // Returns the newly created transaction object
  }

  // Updates an existing transaction in the database
  async updateTransaction(id, date, type, price, userId, agentId, propertyId) {
    const [result] = await this.pool.query(
      'UPDATE transaction SET transaction_date = ?, transaction_type = ?, transaction_price = NOW(), user_id = ?, agent_id = ?, property_id = ? WHERE transaction_id = ?',
      [date, type, price, userId, agentId, propertyId, id]  // Executes the query to update the transaction
    );
    return result.affectedRows > 0;  // Returns true if the update was successful, otherwise false
  }

  // Deletes a transaction by ID
  async deleteTransaction(id) {
    const [result] = await this.pool.query('DELETE FROM transaction WHERE transaction_id = ?', [id]);  // Deletes the transaction by its ID
    return result.affectedRows > 0;  // Returns true if the deletion was successful, otherwise false
  }

  async deleteTransactionFromProperty(id){
    const [result] = await this.pool.query('UPDATE transaction SET property_id = null WHERE property_id = ?', [id])
    return result.affectedRows > 0;
    }
}

// Exports an instance of the TransactionService class
module.exports = new TransactionService();