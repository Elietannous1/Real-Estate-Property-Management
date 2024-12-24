/*
  The messageRoute class defines the routes for managing messages between users and agents.
  Validators are used to ensure that the provided data is valid before processing each request.
*/

const express = require('express');
const messageController = require('../controllers/messageController');
const { validateMessage, validateMessageId } = require('../validators/messageDTO');
const router = express.Router();

// Route to get all messages for a user with agent information
// Calls the getAllMessagesWithAgent method in the messageController to retrieve messages for a user, including agent details.
router.get('/', (req, res) => messageController.getAllMessagesWithAgent(req, res));

// Route to get a specific message by ID
// Calls the getMessageForUser method in the messageController, with validation for the message ID.
router.get('/:id', validateMessageId, (req, res) => messageController.getMessageForUser(req, res));

// Route to create a new message
// Calls the createMessage method in the messageController, with validation for the provided data.
router.post('/', validateMessage, (req, res) => messageController.createMessage(req, res));

// Route to update an existing message
// Calls the updateMessage method in the messageController, with validation for the message ID and data.
//router.put('/:id', [validateMessage, validateMessageId], (req, res) => messageController.updateMessage(req, res));
router.post('/update/message/:id', [validateMessage, validateMessageId], (req, res) => messageController.updateMessage(req, res));

// Route to delete a message by ID
// Calls the deleteMessage method in the messageController, with validation for the message ID.
//router.delete('/:id', validateMessageId, (req, res) => messageController.deleteMessage(req, res));
router.get('/delete/message/:id', validateMessageId, (req, res) => messageController.deleteMessage(req, res));

module.exports = router;
