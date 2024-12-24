/*
  The reviewsRoute class defines the routes for managing reviews related to agents and users.
  Validators ensure the validity of the data provided for each request.
*/

const express = require('express');
const reviewsController = require('../controllers/reviewsController');
const { validateReviews, validateReviewsId } = require('../validators/reviewsDTO');
const router = express.Router();

// Route to get all reviews
// Calls the getAllReviews method in the reviewsController to retrieve all reviews.
router.get('/', (req, res) => reviewsController.getAllReviews(req, res));

// Route to fetch reviews from a user for a specific agent
// Calls the getReviewsFromUserForAgent method in the reviewsController.
router.post('/fetchUserAgent', (req, res) => reviewsController.getReviewsFromUserForAgent(req, res));

// Route to fetch reviews based on rating
// Calls the getReviewsFromRating method in the reviewsController.
router.post('/fetchRating', (req, res) => reviewsController.getReviewsFromRating(req, res));

// Route to get reviews for a specific agent by ID
// Calls the getReviewsForAgent method in the reviewsController with validation for the provided ID.
router.get('/:id', validateReviewsId, (req, res) => reviewsController.getReviewsForAgent(req, res));

// Route to create a new review
// Calls the createReviews method in the reviewsController, with validation for the provided data.
router.post('/', validateReviews, (req, res) => reviewsController.createReviews(req, res));

// Route to update an existing review by ID
// Calls the updateReviews method in the reviewsController, with validation for the data and ID.
//router.put('/:id', [validateReviews, validateReviewsId], (req, res) => reviewsController.updateReviews(req, res));
router.post('/update/review/:id', [validateReviews, validateReviewsId], (req, res) => reviewsController.updateReviews(req, res));

// Route to delete a review by ID
// Calls the deleteReviews method in the reviewsController with validation for the ID.
//router.delete('/:id', validateReviewsId, (req, res) => reviewsController.deleteReviews(req, res));
router.get('/delete/review/:id', validateReviewsId, (req, res) => reviewsController.deleteReviews(req, res));

module.exports = router;
