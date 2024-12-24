// services/userService.js
/*
-User Service class with the ability to :
        -get all available users,
        -get a user by id,
        -get user by email,
        -delete a user,
        -create a user,
        -update a user,
        -generate a new token for a certain user.

    --> additional functions used are related to the database to be able to make changes to it.
*/
const { initDB } = require('../config/database');  // Importing the database initialization function
const User = require('../models/userModel');  // Importing the User model

// UserService class for handling user-related operations
class UserService {
  constructor() {
    this.pool = null;  // Initialize pool property to null
    this.init();  // Call init method to set up the database connection
  }

  // Initializes the database connection
  async init() {
    this.pool = await initDB();  // Set up the connection pool
  }

  // Fetches all users from the database
  async getAllUsers() {
    const [rows] = await this.pool.query('SELECT * FROM user');  // Executes a query to get all users
    return rows.map(User.fromRow);  // Maps each row to a User object
  }

  // Fetches a user by their ID
  async getUserById(id) {
    const [rows] = await this.pool.query('SELECT * FROM user WHERE user_id = ?', [id]);  // Query to fetch user by ID
    if (rows.length === 0) return null;  // Return null if no user is found
    return User.fromRow(rows[0]);  // Return the mapped User object
  }

  // Checks if a user exists by their email
  async checkUser(email) {
    try {
      const [rows] = await this.pool.query('SELECT * FROM user WHERE user_email = ?', [email]);  // Query to check user by email
      if (rows.length === 0) {
        console.log("No user found with that email");
        return null;  // Return null if no user found
      }
      return User.fromRow(rows[0]);  // Return the mapped User object
    } catch (error) {
      console.error("Error executing query:", error);  // Log errors
      return null;
    }
  }

  // Creates a new user and inserts into the database
  async createUser(name, email, hashedPass, location) {
    const [result] = await this.pool.query(
      'INSERT INTO user (user_name, user_email, user_password, user_location) VALUES (?, ?, ?, ?)', 
      [name, email, hashedPass, location]  // Executes query to insert user into the database
    );
    const insertedUser = new User(result.insertId, name, email, hashedPass, location);  // Creates User object
    return insertedUser;  // Return the created User object
  }

  // Updates an existing user's information in the database
  async updateUser(id, name, email, password, location) {
    const [result] = await this.pool.query(
      'UPDATE user SET user_name = ?, user_email = ?, user_password = ?, user_location = ? WHERE user_id = ?',
      [name, email, password, location, id]  // Executes query to update the user
    );
    return result.affectedRows > 0;  // Return true if the update was successful, otherwise false
  }

  // Deletes a user from the database
  async deleteUser(id) {
    const [result] = await this.pool.query('DELETE FROM user WHERE user_id = ?', [id]);  // Executes query to delete user
    return result.affectedRows > 0;  // Return true if the deletion was successful, otherwise false
  }
}

// Exports a singleton instance of the UserService class
module.exports = new UserService();
