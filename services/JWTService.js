// Importing required modules
const { initDB } = require('../config/database'); // Database initialization function
const userService = require('../services/userService'); // Service for user operations
const jwt = require('jsonwebtoken'); // JWT library for handling token generation and verification
require('dotenv').config(); // Loads environment variables from a .env file

// JWTService class for handling JWT generation, validation, and token management
class JWTService {
  constructor() {
    this.pool = null;  // Initializes the pool property to null
    this.init();  // Initializes the database connection
  }

  // Initializes the database connection
  async init() {
    this.pool = await initDB();  // Sets up the database connection pool
  }

  // Generates a refresh token for a user
  async generateRefreshToken(user) {
    console.log("user.id in generatedRefreshToken: ", user.id); // Logs the user ID for debugging
    // Creates a refresh token signed with the user's ID and expiration from the environment variable
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {expiresIn : process.env.REFRESH_EXPIRATION});
    await this.saveRefreshToken(user.id, refreshToken); // Saves the refresh token in the database
    return refreshToken; // Returns the generated refresh token
  }

  // Generates an access token for a user
  async generateAccessToken(user) {
    // Creates an access token signed with the user's ID and email, with expiration from the environment variable
    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRATION});
    console.log("accessToken: ", accessToken); // Logs the generated access token for debugging
    return accessToken; // Returns the generated access token
  }

  // Saves the refresh token to the database for the given user ID
  async saveRefreshToken(userId, refreshToken) {
    console.log("id: ", userId); // Logs the user ID for debugging
    try {
      // Executes an SQL query to update the user's refresh token in the database
      const [result] = await this.pool.query('UPDATE user SET refresh_token = ? WHERE user_id = ?', [refreshToken, userId]);
      if (result.affectedRows > 0) {
        console.log("Refresh token saved successfully"); // Logs success if token is saved
      } else {
        console.log("Failed to save refresh token"); // Logs failure if token could not be saved
      }
    } catch (error) {
      console.error("Error saving refresh token:", error); // Logs error if saving refresh token fails
    }
  }

  // Validates the provided refresh token
  async validateRefreshToken(token) {
    try {
      // Verifies the refresh token using the secret key and decodes it
      const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
      // Fetches the user corresponding to the decoded ID from the database
      const user = await userService.getUserById(decoded.id);
      if (user) return { success: true, data: user }; // Returns the user if found
      return { success: false, message: 'User not found' }; // Returns error if user not found
    } catch (err) {
      return { success: false, message: 'Invalid token' }; // Returns error if token is invalid
    }
  }

  // Validates the provided access token
  async validateAccessToken(token) {
    try {
      // Verifies the access token using the secret key and decodes it
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return user; // Returns the decoded user if the token is valid
    } catch (err) {
      return null; // Returns null if the token is invalid
    }
  }

  // Middleware to authenticate the access token for protected routes
  async authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Retrieves the token from the Authorization header
    if (!token) return res.status(403).json({ message: "Access denied" }); // Returns error if no token is provided

    // Verifies the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" }); // Returns error if token is invalid
        req.user = user; // Attaches the user object to the request
        next(); // Proceeds to the next middleware or route handler
    });
  }

  // Removes the refresh token for a specific user from the database
  async removeUserRefreshToken(userId) {
    // Executes an SQL query to set the refresh token field to NULL for the specified user ID
    const [result] = await this.pool.query('UPDATE user SET refresh_token = NULL WHERE user_id = ?', [userId]);
    if (result.affectedRows > 0) {
        return { message: 'Token removed successfully' }; // Returns success message if the token was removed
    } else {
        return { message: 'Token couldnt be removed!' }; // Returns error message if token removal fails
    }
  }

  // Removes the refresh token for a specific agent from the database
  async removeAgentRefreshToken(agentId) {
    // Executes an SQL query to set the refresh token field to NULL for the specified agent ID
    const [result] = await this.pool.query('UPDATE agent SET agent_refresh_token = NULL WHERE agent_id = ?', [agentId]);
    if (result.affectedRows > 0) {
        return { message: 'Token removed successfully' }; // Returns success message if the token was removed
    } else {
        return { message: 'Token couldnt be removed!' }; // Returns error message if token removal fails
    }
  }


// New function to extract user ID from access token
  async extractUserIdFromToken(token) {
    const decoded = await this.validateAccessToken(token); // Validates and decodes the token
    if (decoded && decoded.id) {
      return decoded.id; // Returns the user ID if decoded token contains it
    } else {
      throw new Error("Invalid or missing user ID in token"); // Throws error if the ID is not found
    }
  }
}

// Exports an instance of the JWTService class
module.exports = new JWTService();
