// services/agentService.js
/*
  Agent Service class with the ability to:
    - get all available agents,
    - get an agent by id,
    - get an agent by email,
    - delete an agent,
    - create an agent,
    - update an agent,
    - generate a new token for a certain agent

  --> additional functions used are related to the database to be able to make changes to it
*/

const { initDB } = require('../config/database');  // Import the database initialization function
const Agent = require('../models/agentModel');  // Import the Agent model for transforming database rows

class AgentService {
  constructor() {
    this.pool = null;  // Initialize pool as null to be set later for DB connection
    this.init();  // Call init method to initialize the database connection
  }

  // Initializes the database connection pool
  async init() {
    this.pool = await initDB();  // Wait for the DB connection pool to be initialized
  }

  // Returns all agents from the database
  async getAllAgents() {
    const [rows] = await this.pool.query('SELECT * FROM agent');  // Query the database for all agents
    return rows.map(Agent.fromRow);  // Map rows to Agent model instances using the fromRow method
  }

  // Returns agent with the specified id
  async getAgentById(id) {
    const [rows] = await this.pool.query('SELECT * FROM agent WHERE agent_id = ?', [id]);  // Query by agent id
    if (rows.length === 0) return null;  // If no agent found, return null
    return Agent.fromRow(rows[0]);  // Return the agent mapped from the first row
  }

  // Creates an agent and inserts it into the database
  async createAgent(name, email, hashedPass, propertyId) {
    const [result] = await this.pool.query(
      'INSERT INTO agent (agent_name, agent_email, agent_password, property_id) VALUES (?, ?, ?, ?)',  // SQL insert query
      [name, email, hashedPass, propertyId]  // Values to insert into the query
    );
    const insertedAgent = new Agent(result.insertId, name, email, hashedPass, propertyId);  // Create a new Agent object with inserted data
    return insertedAgent;  // Return the newly created agent instance
  }

  // Updates the agent's details in the database
  async updateAgent(id, name, email, hashedPass, propertyId) {
    const [result] = await this.pool.query(
      'UPDATE agent SET agent_name = ?, agent_email = ?, agent_password = ?, property_id = ? WHERE agent_id = ?',  // SQL update query
      [name, email, hashedPass, propertyId, id]  // Values to update and where condition
    );
    return result.affectedRows > 0;  // Return true if update affected any rows, else false
  }

  // Deletes an agent from the database
  async deleteAgent(id) {
    const [result] = await this.pool.query('DELETE FROM agent WHERE agent_id = ?', [id]);  // SQL delete query
    return result.affectedRows > 0;  // Return true if deletion was successful (affected rows > 0)
  }

  // Checks for a specific agent using an email
  async checkAgent(email) {
    try {
      const [rows] = await this.pool.query('SELECT * FROM agent WHERE agent_email = ?', [email]);  // Query the database to find agent by email
      if (rows.length === 0) {
        console.log("No agent found with that email");  // Log if no agent is found
        return null;  // Return null if no agent exists
      }
      return Agent.fromRow(rows[0]);  // Return the first matching agent mapped to the Agent model
    } catch (error) {
      console.error("Error executing query:", error);  // Log any error that occurs during the query
      return null;  // Return null if there's an error
    }
  }

  // Generates a new JWT from an existing refresh token
  async generateNewToken(req, res) {
    try {
      const { refreshToken } = req.body;  // Extract the refresh token from the request body
      if (!refreshToken) {  // If no refresh token is provided
        return res.status(400).json({ message: 'No refresh token provided' });  // Send bad request response
      }

      const result = await jwt.validateRefreshToken(refreshToken);  // Validate the refresh token
      console.log("result:", result);  // Log the result of validation

      if (result.success) {  // If validation is successful
        const accessToken = await jwt.generateAccessToken(result.data);  // Generate a new access token
        return res.json({ accessToken });  // Send the new access token as a JSON response
      } else {
        return res.status(403).json({ message: result.message });  // Send forbidden response if validation fails
      }
    } catch (error) {
      console.log('Error:', error);  // Log any error during the process
      res.status(500).json({ message: 'Internal Server Error' });  // Send internal server error response
    }
  }

  async deletePropertyForAgent(id) {
    const [result] = await this.pool.query('UPDATE agent SET property_id = NULL WHERE property_id = ?', [id]);  // SQL update query
    return result.affectedRows > 0;
  }
}

// Exports the AgentService class instance
module.exports = new AgentService();
