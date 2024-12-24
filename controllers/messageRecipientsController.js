// controllers/messagerecipientsController.js
const messageRecipientsService = require('../services/messageRecipientsService');

class MessageRecipientsController {
    
  // Fetch all message recipients from the service
  async getAllMessageRecipients(req, res) {
    try {
      const messageRecipients = await messageRecipientsService.getAllMessageRecipients(); // Get all recipients
      res.json(messageRecipients); // Return all message recipients as JSON
    } catch (error) {
      console.error('Error fetching messagerecipients:', error);
      res.status(500).json({ messagerecipients: 'Internal server error' }); // Handle errors
    }
  }

  // Fetch a specific message recipient by its unique ID
  async getMessageRecipientsById(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Get recipient ID from the request params
      const messageRecipients = await messageRecipientsService.getMessageRecipientsById(id); // Get recipient by ID
      res.json(messageRecipients); // Return the recipient details as JSON
    } catch (error) {
      console.error('Error fetching messagerecipients:', error);
      res.status(500).json({ messageRecipients: 'Internal server error' }); // Handle errors
    }
  }

  // Create a new message recipient record from the request body
  async createMessageRecipients(req, res) {
    try {
      const { userId, agentId, messageId } = req.body; // Extract values from request body
      const newMessageRecipients = await messageRecipientsService.createMessageRecipients(userId, agentId, messageId); // Create new record
      res.status(201).json(newMessageRecipients); // Return the newly created record with a 201 status
    } catch (error) {
      console.error('Error creating message recipients:', error);
      res.status(500).json({ messageRecipients: 'Internal server error' }); // Handle errors
    }
  }

  // Update an existing message recipient record by its ID
  async updateMessageRecipients(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Get recipient ID from the request params
      const { userId, agentId, messageId } = req.body; // Extract values from request body
      const success = await messageRecipientsService.updateMessageRecipients(id, userId, agentId, messageId); // Update the record
      res.json({ messageRecipients: 'MessageRecipients updated successfully' }); // Return success message
    } catch (error) {
      console.error('Error updating message recipients:', error);
      res.status(500).json({ messagerecipients: 'Internal server error' }); // Handle errors
    }
  }

  // Delete a message recipient record by its ID
  async deleteMessageRecipients(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Get recipient ID from the request params
      const success = await messageRecipientsService.deleteMessageRecipients(id); // Delete the recipient record
      res.json({ messagerecipients: 'MessageRecipients deleted successfully' }); // Return success message
    } catch (error) {
      console.error('Error deleting messagerecipients:', error);
      res.status(500).json({ messagerecipients: 'Internal server error' }); // Handle errors
    }
  }
}

module.exports = new MessageRecipientsController();
