// Importing required modules
const { initDB } = require('../config/database'); // Database initialization function
const messageRecipients = require('../models/messageRecipientsModel'); // Model for message recipients

// MessageRecipientsService class for managing message recipient operations
class MessageRecipientsService {
  constructor() {
    this.pool = null;  // Initializes the pool property to null
    this.init();  // Initializes the database connection
  }

  // Initializes the database connection
  async init() {
    this.pool = await initDB();  // Sets up the database connection pool
  }

  // Retrieves all message recipients from the database
  async getAllMessageRecipients() {
    const [rows] = await this.pool.query('SELECT * FROM message_recipients');  // Executes query to fetch all message recipients
    return rows.map(messageRecipients.fromRow);  // Maps the rows to messageRecipient objects and returns
  }

  // Retrieves a message recipient by ID
  async getMessageRecipientsById(id) {
    const [rows] = await this.pool.query('SELECT * FROM message_recipients WHERE message_recipients_id = ?', [id]);  // Fetches a specific message recipient by ID
    if (rows.length === 0) return null;  // Returns null if no rows are found
    return messageRecipients.fromRow(rows[0]);  // Maps the first row to a messageRecipient object and returns it
  }

  // Creates a new message recipient
  async createMessageRecipients(userId, agentId, messageId) {
    const [result] = await this.pool.query(
      'INSERT INTO message_recipients (user_id, agent_id, message_id) VALUES (?, ?, ?)',  // Executes query to insert a new message recipient
      [userId, agentId, messageId]  // Passes the user ID, agent ID, and message ID as parameters
    );
    const insertedmessagerecipients = new messageRecipients(result.insertId, userId, agentId, messageId);  // Creates a new messageRecipient object with the inserted ID
    return insertedmessagerecipients;  // Returns the new messageRecipient object
  }

  // Updates an existing message recipient
  async updateMessageRecipients(id, userId, agentId, messageId) {
    const [result] = await this.pool.query(
      'UPDATE message_recipients SET user_id = ?, agent_id =?, message_id = ? WHERE message_recipients_id = ?',  // Executes query to update an existing message recipient
      [userId, agentId, messageId, id]  // Passes the updated values and the ID of the message recipient to be updated
    );
    return result.affectedRows > 0;  // Returns true if any rows were affected (updated), false otherwise
  }

  // Deletes a message recipient by ID
  async deleteMessageRecipients(id) {
    const [result] = await this.pool.query('DELETE FROM message_recipients WHERE message_recipients_id = ?', [id]);  // Executes query to delete a message recipient by ID
    return result.affectedRows > 0;  // Returns true if any rows were affected (deleted), false otherwise
  }
}

// Exports an instance of the MessageRecipientsService class
module.exports = new MessageRecipientsService();
