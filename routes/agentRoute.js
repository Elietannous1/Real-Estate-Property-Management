/*
  The agentRoute class defines the routes to manage agents and provides access to the controller functions.
  Validators are applied to ensure the credentials provided are valid before proceeding with the controller logic.
*/

const express = require('express');
const agentController = require('../controllers/agentController');
const { validateAgent, validateAgentId } = require('../validators/agentDTO');
const router = express.Router();

// Route to get all agents
// Calls the getAllAgents method from the controller to fetch and return all agents.
router.get('/', (req, res) => agentController.getAllAgents(req, res));

// Route to log out an agent
// Calls the logout method from the controller to log the agent out.
router.post('/logout', (req, res) => agentController.logout(req, res));

// Route to get a specific agent by ID
// The validateAgentId middleware validates the provided ID before calling the controller method to fetch the agent by ID.
router.get('/:id', validateAgentId, (req, res) => agentController.getAgentById(req, res));

// Route to update an agent's details by ID
// The validateAgent and validateAgentId middlewares ensure the provided data and ID are valid before calling the controller method to update the agent's details.
//router.put('/:id', [validateAgent, validateAgentId], (req, res) => agentController.updateAgent(req, res));
router.post('/update/agent:id', [validateAgent, validateAgentId], (req, res) => agentController.updateAgent(req, res));


// Route to delete an agent by ID
// The validateAgentId middleware validates the provided ID before calling the controller method to delete the agent.
//router.delete('/:id', validateAgentId, (req, res) => agentController.deleteAgent(req, res));
router.get('/delete/agent/:id', [validateAgentId], (req, res) => agentController.deleteAgent(req, res));


module.exports = router;
