// Importing required modules
const { initDB } = require('../config/database'); // Database initialization function
const message = require('../models/messageModel'); // Message model for message data

// MessageService class for handling message-related operations
class MessageService {
  constructor() {
    this.pool = null;  // Initializes the pool property to null
    this.init();  // Calls the init method to set up the database connection
  }

  // Initializes the database connection
  async init() {
    this.pool = await initDB();  // Sets up the database connection pool
  }

  // Retrieves all messages for a user with a specific agent
  async getAllMessagesWithAgent(userId, agentId) {
    const [rows] = await this.pool.query(
      'SELECT m.* FROM message_recipients mr LEFT JOIN message m ON m.message_id = mr.message_id WHERE mr.user_id = ? AND mr.agent_id = ?;', 
      [userId, agentId]  // Fetches all messages where the user and agent match
    );
    if (rows.length === 0) return null;  // If no messages found, return null
    return message.fromRow(rows[0]);  // Maps the first row to a message object and returns it
  }

  // Retrieves all messages for a specific user
  async getMessageForUser(id) {
    const [rows] = await this.pool.query(
      'SELECT m.* FROM message_recipients mr LEFT JOIN message m ON m.message_id = mr.message_id WHERE mr.user_id = ?;', 
      [id]  // Fetches messages where the user matches the given ID
    );
    if (rows.length === 0) return null;  // If no messages found, return null
    return message.fromRow(rows[0]);  // Maps the first row to a message object and returns it
  }

  // Creates a new message with the given content
  async createMessage(content) {
    const [result] = await this.pool.query(
      'INSERT INTO message (content, date_sent) VALUES (?, NOW())', 
      [content]  // Executes the query to insert the content of the new message
    );
    const insertedmessage = new message(result.insertId, content);  // Creates a new message object with the inserted ID
    return insertedmessage;  // Returns the newly created message object
  }

  // Updates an existing message with new content
  async updateMessage(id, content) {
    const [result] = await this.pool.query(
      'UPDATE message SET content = ?, date_sent = NOW() WHERE message_id = ?', 
      [content, id]  // Executes the query to update the message content and date_sent
    );
    return result.affectedRows > 0;  // Returns true if the update was successful, false otherwise
  }

  // Deletes a message by its ID
  async deleteMessage(id) {
    const [result] = await this.pool.query('DELETE FROM message WHERE message_id = ?', [id]);  // Executes the query to delete the message by ID
    return result.affectedRows > 0;  // Returns true if the deletion was successful, false otherwise
  }
}

// Exports an instance of the MessageService class
module.exports = new MessageService();
