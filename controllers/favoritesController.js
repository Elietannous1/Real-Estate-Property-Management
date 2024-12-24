// controllers/favoritesController.js
const favoritesService = require('../services/favoritesService');
const userService = require('../services/userService')
const propertyService = require('../services/propertyService');
const { Property } = require('../models/propertyModel');
class FavoritesController {
    
  // Get all favorites from the database
  async getAllFavorites(req, res) {
    try {
      const favorites = await favoritesService.getAllFavorites(); // Fetch all favorites
      console.log("favorites before enriching: ", favorites);
  
      // Enrich each favorite with property data and user name
      const enrichedFavorites = await Promise.all(
        favorites.map(async (favorite) => {
          const user = await userService.getUserById(favorite.userId);
          const property = await propertyService.getPropertyById(favorite.propertyId);
  
          // Return all property data along with the user name
          return {
            ...favorite,
            username: user ? user.name : 'Unknown User',
            property: property || {},  // Store the entire property object
          };
        })
      );
  
      console.log("EnrichedFavorites: ", enrichedFavorites); // Debugging log to verify enriched data
      res.render('favorites', { favorites: enrichedFavorites }); // Pass enriched favorites to EJS
    } catch (error) {
      console.error('Error fetching favorites:', error);
      res.render('500'); // Render error page in case of failure
    }
  }
  
  

  // Get a specific favorite by its ID
  async getFavoritesById(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Extract favorite ID from request params
      const favorites = await favoritesService.getFavoritesById(id); // Fetch favorite by ID from service
      res.json(favorites); // Return the favorite as JSON
    } catch (error) {
      console.error('Error fetching favorites:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }

  // Create a new favorite with the provided note, userId, and propertyId
  async createFavorites(req, res) {
    try {
      const { note, userId, propertyId } = req.body; // Extract data from request body
      const newFavorites = await favoritesService.createFavorites(note, userId, propertyId); // Create a new favorite
      res.status(201).json(newFavorites); // Return the newly created favorite with a 201 status
    } catch (error) {
      console.error('Error creating favorites:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }

  // Update an existing favorite by its ID
  async updateFavorites(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Extract favorite ID from request params
      const { note } = req.body; // Extract updated data from request body
      const success = await favoritesService.updateFavorites(id, note); // Update the favorite
      //res.json({ message: 'Favorites updated successfully' }); // Return success message
      res.redirect('/favorites')
    } catch (error) {
      console.error('Error updating favorites:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }

  // Delete a favorite by its ID
  async deleteFavorites(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Extract favorite ID from request params
      const success = await favoritesService.deleteFavorites(id); // Delete the favorite by ID
      //res.json({ message: 'Favorites deleted successfully' }); // Return success message
      res.redirect('/favorites')
    } catch (error) {
      console.error('Error deleting favorites:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }

  async editForm(req,res) {
    try{
      const id = req.params.id
      const favorite = await favoritesService.getFavoritesById(id)

      console.log('Favorites:', favorite)
      if(!favorite)
        res.render('500')

      res.render('editFavorites', {favorite: favorite})
    } catch (error) {
      console.log('error: ', error)
      res.render('500')
    }
  }
}

module.exports = new FavoritesController();
