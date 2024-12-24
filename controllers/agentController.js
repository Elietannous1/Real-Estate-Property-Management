// controllers/agentController.js
/*
      -Agent controller class with the ability to :
        -get all available agents,
        -get a agent by id,
        -delete a agent,
        -create a agent,
        -update a agent,
        -log a agent in,
        -log a agent out,
        -generate a new token for a certain agent

    -->additional Classes used are the JWTService class that provides functions for assigning jwts and deleting them
    -->additional functions used are related to hashing the users password upon login or signup
*/

const agentService = require('../services/agentService');
const { hashPassword, checkPassword } = require('../helpers/authHelper')
const jwt = require('../services/JWTService')

class AgentController {
    
  // Fetches all agents in the database  
  async getAllAgents(req, res) {
    try {
      const agents = await agentService.getAllAgents();
      res.json(agents);
    } catch (error) {
      console.error('Error fetching agents:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  // Fetches a specific agent by ID
  async getAgentById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const agent = await agentService.getAgentById(id);
      res.json(agent);
    } catch (error) {
      console.error('Error fetching agent:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  // Creates a new agent (sign up), adds to the database, and generates JWT tokens
  async createAgent(req, res) {
    const { name, email, password, location } = req.body;
      const agent = await agentService.checkAgent(email)
      console.log("agent: " ,agent)
      if(!agent){
      const hashedPass = await hashPassword(password)
      const newAgent = await agentService.createAgent( name, email, hashedPass, location );
      const accessToken = await jwt.generateAccessToken(newAgent)
      const refreshToken = await jwt.generateRefreshToken(newAgent)
      res.status(201).json({Agent : newAgent,
        AccessToken : accessToken,
        RefreshToken : refreshToken
      });
      } else {
        res.status(500).json({message : 'Email already exists'})
      }
    } catch (error) {
      console.error('Error creating agent:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  // Updates agent details based on agent ID
  async updateAgent(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { name, email, password, propertyId } = req.body;
      const hashedPass = await hashPassword(password)
      const success = await agentService.updateAgent(id, name, email, hashedPass, propertyId);
      res.json({ message: 'Agent updated successfully' });
    } catch (error) {
      console.error('Error updating agent:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  // Deletes an agent by ID
  async deleteAgent(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await agentService.deleteAgent(id);
      res.json({ message: 'Agent deleted successfully' });
    } catch (error) {
      console.error('Error deleting agent:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  // Logs an agent in and generates JWT tokens if credentials are valid
  async logAgentIn(req, res) {
    const { email, password } = req.body
      const hashedPass = await hashPassword(password)
      const agent = await agentService.checkAgent(email)
      if(agent && await checkPassword(password, hashedPass)){
        const accessToken = await jwt.generateAccessToken(agent)
        const refreshToken = await jwt.generateRefreshToken(agent)
        res.json({ message : 'Login successful',
          accessToken: accessToken,
          refreshToken: refreshToken
         })
      } else {
        return res.status(403).json({message : "Wrong email or password"})
      }
    } catch (error) {
      console.error("error : ", error)
      res.status(500).json({ message : "Internal server error"})
    }
    // Logs an agent out and removes their refresh token
    async logout(req, res){
      try {
        const {id} = req.body
        const success = await jwt.removeAgentRefreshToken(id)
        if(success){
          res.json({ message : 'logout successful'})
        } else {
          res.json({ message : 'Logout failed!'})
        }
      } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({ message : 'Internal Server Error' })
      }
    }
  // Generates a new access token using a refresh token
    async generateNewToken(req, res){
      try {
        const { refreshToken } = req.body;
          if (!refreshToken) {
            return res.status(400).json({ message: 'No refresh token provided' });
          }
  
        const result = await jwt.validateRefreshToken(refreshToken);
        console.log("result:", result);
  
          if (result.success) {
            const accessToken = await jwt.generateAccessToken(result.data);
            return res.json({ accessToken });
          } else {
            return res.status(403).json({ message: result.message });
          }
      } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
}

// Exports the AgentController class
module.exports = new AgentController();
