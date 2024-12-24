/*
  The favoritesRoute class defines the routes to manage user favorites for properties, connecting to functions in the controller.
  Validators ensure that the data provided in each request is valid before performing any actions.
*/

const express = require('express');
const favoritesController = require('../controllers/favoritesController');
const { validateFavorites, validateFavoritesId } = require('../validators/favoritesDTO');
const router = express.Router();

// Route to fetch all favorites
// Calls the getAllFavorites method in the favoritesController to retrieve all user favorites.
router.get('/', (req, res) => favoritesController.getAllFavorites(req, res));

// Route to fetch a specific favorite by ID
// Calls the getFavoritesById method in the favoritesController, with validation for the favorite ID.
router.get('/:id', validateFavoritesId, (req, res) => favoritesController.getFavoritesById(req, res));

// Route to create a new favorite
// Calls the createFavorites method in the favoritesController, with validation for the provided data.
router.post('/', validateFavorites, (req, res) => favoritesController.createFavorites(req, res));

// Route to update an existing favorite
// Calls the updateFavorites method in the favoritesController, with validation for the favorite ID and the data.
//router.put('/:id', [validateFavorites, validateFavoritesId], (req, res) => favoritesController.updateFavorites(req, res));
router.post('/update/:id', [validateFavorites, validateFavoritesId], (req, res) => favoritesController.updateFavorites(req, res));

router.get('/edit-form/:id', (req,res) => favoritesController.editForm(req,res))
// Route to delete a favorite
// Calls the deleteFavorites method in the favoritesController, with validation for the favorite ID.
//router.delete('/:id', validateFavoritesId, (req, res) => favoritesController.deleteFavorites(req, res));
router.get('/delete/:id', validateFavoritesId, (req, res) => favoritesController.deleteFavorites(req, res));

module.exports = router;
