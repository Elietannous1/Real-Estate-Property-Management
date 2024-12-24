// Importing the database initialization function and the Favorites model
const { initDB } = require('../config/database');
const favorites = require('../models/favoritesModel');

// FavoritesService class for managing favorite properties
class FavoritesService {
  constructor() {
    this.pool = null;  // Initializes the pool property as null
    this.init();  // Calls the init method to initialize the database connection
  }

  // Initializes the database connection pool
  async init() {
    this.pool = await initDB();  // Sets the pool to the initialized DB connection
  }

  // Fetches all favorites from the database
  async getAllFavorites() {
    const [rows] = await this.pool.query('SELECT * FROM favorites');  // Query to get all favorites
    return rows.map(favorites.fromRow);  // Maps each row to a Favorites model instance
  }

  // Fetches a specific favorite by its ID
  async getFavoritesById(id) {
    const [rows] = await this.pool.query('SELECT * FROM favorites WHERE favorites_id = ?', [id]);  // Query for specific favorite
    if (rows.length === 0) return null;  // Returns null if no favorite is found
    return favorites.fromRow(rows[0]);  // Returns the favorite mapped from the row
  }

  // Creates a new favorite and inserts it into the database
  async createFavorites(note, userId, propertyId) {
    const [result] = await this.pool.query(
      'INSERT INTO favorites (note, user_id, property_id) VALUES (?, ?, ?)',  // SQL insert query
      [note, userId, propertyId]  // Values to be inserted
    );
    const insertedFavorites = new favorites(result.insertId, note, userId, propertyId);  // Creates a new Favorites object
    return insertedFavorites;  // Returns the newly created favorite object
  }

  // Updates an existing favorite in the database
  async updateFavorites(id, note) {
    const [result] = await this.pool.query(
      'UPDATE favorites SET note = ? WHERE favorites_id = ?',  // SQL update query
      [note, id]  // Values to update
    );
    return result.affectedRows > 0;  // Returns true if the update was successful (affected rows > 0)
  }

  // Deletes a favorite from the database
  async deleteFavorites(id) {
    const [result] = await this.pool.query('DELETE FROM favorites WHERE favorites_id = ?', [id]);  // SQL delete query
    return result.affectedRows > 0;  // Returns true if the deletion was successful (affected rows > 0)
  }

  async deleteFavoritesFromProperty(id){
    const [result] = await this.pool.query('DELETE FROM favorites WHERE property_id = ?', [id])
    return result.affectedRows > 0;
    }

    async getFavoritesByUserId(id){
    const [rows] = await this.pool.query('SELECT * FROM favorites WHERE user_id = ?', [id]);  // Query for specific favorite
    if (rows.length === 0) return null;  // Returns null if no favorite is found
    return favorites.fromRow(rows[0]);  // Returns the favorite mapped from the row 
    }
}

// Exports a new instance of the FavoritesService class
module.exports = new FavoritesService();
