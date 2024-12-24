// controllers/propertydetailsController.js

const propertyDetailsService = require('../services/propertyDetailsService');

class PropertyDetailsController {

  // Fetches all property details from the database
  async getAllPropertyDetails(req, res) {
    try {
      const propertydetails = await propertyDetailsService.getAllPropertyDetails();
      res.json(propertydetails);
    } catch (error) {
      console.error('Error fetching propertyDetails:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Fetches property details by specific ID
  async getPropertyDetailsById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const propertydetails = await propertyDetailsService.getPropertyDetailsById(id);
      res.json(propertydetails);
    } catch (error) {
      console.error('Error fetching propertydetails:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Creates new property details record
  async createPropertyDetails(req, res) {
    try {
      const { bathroom, bedroom, garden, gardenArea, propertyId } = req.body;
      const newPropertyDetails = await propertyDetailsService.createPropertyDetails(bathroom, bedroom, garden, gardenArea, propertyId);
      res.status(201).json(newPropertyDetails);
    } catch (error) {
      console.error('Error creating propertydetails:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Updates property details by ID
  async updatePropertyDetails(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { bedroom, bathroom, garden, gardenArea, propertyId } = req.body;
      const success = await propertyDetailsService.updatePropertyDetails(id, bedroom, bathroom, garden, gardenArea, propertyId);
      res.json({ message: 'PropertyDetails updated successfully' });
    } catch (error) {
      console.error('Error updating propertydetails:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Deletes property details by ID
  async deletePropertyDetails(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await propertyDetailsService.deletePropertyDetails(id);
      res.json({ message: 'PropertyDetails deleted successfully' });
    } catch (error) {
      console.error('Error deleting propertydetails:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

// Exports the PropertyDetailsController class
module.exports = new PropertyDetailsController();
