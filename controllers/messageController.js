// controllers/messageController.js
const messageService = require('../services/messageService');
const jwtService = require('../services/JWTService')

class MessageController {
    
  // Get all messages for a specific user and agent
  async getAllMessagesWithAgent(req, res) {
    try {
      const token = req.headers['authorization']?.split(' ')[1]; // Get the token from headers
      const userId = await jwtService.extractUserIdFromToken(token);
      console.log('User ID:', userId);
      console.log(req.user.userId)
      const { agentId } = req.body;  // Get agentId from request body
  
      if (!userId) {
        return res.redirect('/login');  // If userId is not present, redirect to login
      }
  
      const messages = await messageService.getAllMessagesWithAgent(userId, agentId);  // Fetch messages based on userId and agentId
      res.render('messages', { messages: messages });  // Render messages page
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.render('500');  // Render error page
    }
  }
  
  // Get a specific message for a user based on the message ID
  async getMessageForUser(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Get message ID from request params
      const message = await messageService.getMessageForUser(id); // Fetch message by ID
      res.json(message); // Return message as JSON
    } catch (error) {
      console.error('Error fetching message:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }

  // Create a new message with the content from the request body
  async createMessage(req, res) {
    try {
      const { content } = req.body; // Extract content from request body
      const newMessage = await messageService.createMessage(content); // Create a new message
      res.status(201).json(newMessage); // Return the newly created message with a 201 status
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }

  // Update an existing message by its ID with new content
  async updateMessage(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Get message ID from request params
      const { content } = req.body; // Extract updated content from request body
      const success = await messageService.updateMessage(id, content); // Update the message
      res.json({ message: 'Message updated successfully' }); // Return success message
    } catch (error) {
      console.error('Error updating message:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }

  // Delete a specific message by its ID
  async deleteMessage(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Get message ID from request params
      const success = await messageService.deleteMessage(id); // Delete the message
      res.json({ message: 'Message deleted successfully' }); // Return success message
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }
}

module.exports = new MessageController();
