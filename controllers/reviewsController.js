// controllers/reviewsController.js

const reviewsService = require('../services/reviewsService');

class ReviewsController {

  // Fetches all reviews from the database
  async getAllReviews(req, res) {
    try {
      const reviews = await reviewsService.getAllReviews();
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Fetches all reviews for a specific agent by agent ID
  async getReviewsForAgent(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const reviews = await reviewsService.getReviewsForAgent(id);

      if (!reviews) {
        return res.status(404).json({ message: 'No reviews found for this agent' });
      }

      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Fetches all reviews with a specified rating
  async getReviewsFromRating(req, res) {
    try {
      const { rating } = req.body;
      const reviews = await reviewsService.getReviewsFromRating(rating);
      res.json({ reviews });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Fetches reviews written by a specific user for a specific agent
  async getReviewsFromUserForAgent(req, res) {
    try {
      const { userId, agentId } = req.body;
      const reviews = await reviewsService.getReviewsFromUserForAgent(userId, agentId);
      res.json({ reviews });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Creates a new review and adds it to the database
  async createReviews(req, res) {
    try {
      const { comment, rating, userId, agentId, propertyId } = req.body;
      const newReview = await reviewsService.createReviews(comment, rating, userId, agentId, propertyId);
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating reviews:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Updates an existing review by ID
  async updateReviews(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { comment, rating, userId, agentId, propertyId } = req.body;
      const success = await reviewsService.updateReviews(id, comment, rating, userId, agentId, propertyId);
      res.json({ message: 'Review updated successfully' });
    } catch (error) {
      console.error('Error updating reviews:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Deletes a review by ID
  async deleteReviews(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await reviewsService.deleteReviews(id);
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting reviews:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

// Exports the ReviewsController class
module.exports = new ReviewsController();
