/*
  The authRoute class defines the routes for managing user and agent authentication, allowing access to respective functions in the controller.
  Validators ensure that the provided credentials are valid before performing any actions.
*/

const express = require('express');
const userController = require('../controllers/userController');
const agentController = require('../controllers/agentController');
const router = express.Router();

// Route to sign up a new user
// Calls the createUser method in the userController to register a new user.
router.post('/signup', (req, res) => userController.createUser(req, res));

// Route to log in an existing user
// Calls the logUserIn method in the userController to authenticate the user and issue a token.
router.post('/login', (req, res) => userController.logUserIn(req, res));

// Route to refresh the authentication token for a user
// Calls the generateNewToken method in the userController to generate a new token for the user.
router.post('/refresh/token', (req, res) => userController.generateNewToken(req, res));

// Route to sign up a new agent
// Calls the createUser method in the agentController to register a new agent.
router.post('/agent/signup', (req, res) => agentController.createUser(req, res));

// Route to log in an existing agent
// Calls the logAgentIn method in the agentController to authenticate the agent and issue a token.
router.post('/agent/login', (req, res) => agentController.logAgentIn(req, res));

// Route to refresh the authentication token for an agent
// Calls the generateNewToken method in the agentController to generate a new token for the agent.
router.post('/agent/refresh/token', (req, res) => agentController.generateNewToken(req, res));

module.exports = router;
