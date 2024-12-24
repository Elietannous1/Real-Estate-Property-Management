/*
  The messageRecipientsRoute class defines the routes for managing message recipients in the system, connecting to functions in the controller.
  Validators are used to ensure that the provided data is valid before processing each request.
*/

const express = require('express');
const messageRecipientsController = require('../controllers/messageRecipientsController');
const { validateMessageRecipients, validateMessageRecipientsId } = require('../validators/messageRecipientsDTO');
const router = express.Router();

// Route to get all message recipients
// Calls the getAllMessageRecipients method in the messageRecipientsController to retrieve all recipients.
router.get('/', (req, res) => messageRecipientsController.getAllMessageRecipients(req, res));

// Route to get a specific message recipient by ID
// Calls the getMessageRecipientsById method in the messageRecipientsController, with validation for the recipient ID.
router.get('/:id', validateMessageRecipientsId, (req, res) => messageRecipientsController.getMessageRecipientsById(req, res));

// Route to create a new message recipient
// Calls the createMessageRecipients method in the messageRecipientsController, with validation for the provided data.
router.post('/', validateMessageRecipients, (req, res) => messageRecipientsController.createMessageRecipients(req, res));

// Route to update an existing message recipient
// Calls the updateMessageRecipients method in the messageRecipientsController, with validation for the recipient ID and data.
//router.put('/:id', [validateMessageRecipients, validateMessageRecipientsId], (req, res) => messageRecipientsController.updateMessageRecipients(req, res));
router.post('/update/messageRecipients/:id', [validateMessageRecipients, validateMessageRecipientsId], (req, res) => messageRecipientsController.updateMessageRecipients(req, res));

// Route to delete a message recipient
// Calls the deleteMessageRecipients method in the messageRecipientsController, with validation for the recipient ID.
//router.delete('/:id', validateMessageRecipientsId, (req, res) => messageRecipientsController.deleteMessageRecipients(req, res));
router.get('/delete/messageRecipients/:id', validateMessageRecipientsId, (req, res) => messageRecipientsController.deleteMessageRecipients(req, res));

module.exports = router;
