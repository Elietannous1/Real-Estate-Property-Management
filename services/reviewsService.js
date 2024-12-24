// Importing required modules
const { initDB } = require('../config/database');  // Initializes the database connection
const reviews = require('../models/reviewsModel');  // Importing reviews model

// ReviewsService class for handling review-related operations
class ReviewsService {
  constructor() {
    this.pool = null;  // Initializes the pool property to null
    this.init();  // Calls init method to set up the database connection
  }

  // Initializes the database connection
  async init() {
    this.pool = await initDB();  // Sets up the database connection pool
  }

  // Retrieves all reviews from the database
  async getAllReviews() {
    const [rows] = await this.pool.query('SELECT * FROM reviews');  // Fetches all reviews from the database
    return rows.map(reviews.fromRow);  // Maps each row to a review object using fromRow method
  }

  // Retrieves all reviews for a specific agent
  async getReviewsForAgent(id) {
    const [rows] = await this.pool.query('SELECT * FROM reviews WHERE agent_id = ?', [id]);  // Fetches reviews for the given agent ID
    if (rows.length === 0) return null;  // If no reviews are found, return null
    return rows.map(reviews.fromRow);  // Maps each row to a review object
  }

  // Retrieves reviews based on a specific rating
  async getReviewsFromRating(rating) {
    const [rows] = await this.pool.query('SELECT * FROM reviews WHERE review_rating = ?', [rating]);  // Fetches reviews with the given rating
    if (rows.length === 0) return null;  // If no reviews are found, return null
    return rows.map(reviews.fromRow);  // Maps each row to a review object
  }

  // Creates a new review in the database
  async createReviews(comment, rating, userId, agentId) {
    const [result] = await this.pool.query(
      'INSERT INTO reviews (review_comment, review_rating, review_date, user_id, agent_id) VALUES (?, ?, NOW(), ?, ?)',
      [comment, rating, userId, agentId]  // Inserts the review into the database
    );
    const insertedReviews = new reviews(result.insertId, comment, rating, userId, agentId);  // Creates a new review object with the inserted ID
    return insertedReviews;  // Returns the newly created review object
  }

  // Updates an existing review in the database
  async updateReviews(id, comment, rating, userId, agentId) {
    const [result] = await this.pool.query(
      'UPDATE reviews SET review_comment = ?, review_rating = ?, review_date = NOW(), user_id = ?, agent_id = ? WHERE review_id = ?',
      [comment, rating, userId, agentId, id]  // Executes the query to update the review
    );
    return result.affectedRows > 0;  // Returns true if the update was successful, otherwise false
  }

  // Retrieves reviews from a specific user for a specific agent
  async getReviewsFromUserForAgent(userId, agentId) {
    const [rows] = await this.pool.query('SELECT * from reviews WHERE user_id = ? AND agent_id = ?', [userId, agentId]);  // Fetches reviews from the user for the given agent
    return rows.map(reviews.fromRow);  // Maps each row to a review object
  }

  // Deletes a review by ID
  async deleteReviews(id) {
    const [result] = await this.pool.query('DELETE FROM reviews WHERE review_id = ?', [id]);  // Deletes the review by its ID
    return result.affectedRows > 0;  // Returns true if the deletion was successful, otherwise false
  }
}

// Exports an instance of the ReviewsService class
module.exports = new ReviewsService();
