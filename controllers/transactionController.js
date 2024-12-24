// controllers/transactionsController.js

const transactionsService = require('../services/transactionService');
const userService = require('../services/userService')
const agentService = require('../services/agentService')
const propertyService = require('../services/propertyService')
class TransactionsController {

  // Fetches all transactions from the database
  async getAllTransactions(req, res) {
    try {
      const transactions = await transactionsService.getAllTransaction();
  
      // Use Promise.all to fetch user and agent details for each transaction
      const enrichedTransactions = await Promise.all(
        transactions.map(async (transaction) => {
          const user = await userService.getUserById(transaction.userId);
          const agent = await agentService.getAgentById(transaction.agentId);
          const property = await propertyService.getPropertyById(transaction.propertyId);

          return {
            ...transaction,
            username: user ? user.name : 'Unknown User',
            agentUsername: agent ? agent.name : 'Unknown Agent',
            propertyName: property ? property.propertyName : 'Unknown Property'
          };
        })
      );
  
      console.log(enrichedTransactions);
      res.render('transactions', { transactions: enrichedTransactions });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Render the 500 error page
      res.render('500');
    }
  }
  
  // Fetches a specific transaction by ID
  async getTransactionsById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const transactions = await transactionsService.getTransactionById(id);
      res.json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Creates a new transaction and adds it to the database
  async createTransactions(req, res) {
    try {
      const { date, type, price, userId, agentId, propertyId } = req.body;
      const newTransactions = await transactionsService.createTransaction(date, type, price, userId, agentId, propertyId);
      res.status(201).json(newTransactions);
    } catch (error) {
      console.error('Error creating transactions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Updates an existing transaction by ID
  async updateTransactions(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { date, type, price, userId, agentId, propertyId } = req.body;
      const success = await transactionsService.updateTransaction(id, date, type, price, userId, agentId, propertyId);
      res.json({ message: 'Transaction updated successfully' });
    } catch (error) {
      console.error('Error updating transactions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Deletes a transaction by ID
  async deleteTransactions(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await transactionsService.deleteTransaction(id);
      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error('Error deleting transactions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

// Exports the TransactionsController class
module.exports = new TransactionsController();
