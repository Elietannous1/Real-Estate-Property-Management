// controllers/propertyController.js
const propertyService = require('../services/propertyService');
const propertyDetailsService = require('../services/propertyDetailsService')
const favoritesService = require('../services/favoritesService')
const transactionService = require('../services/transactionService')
const agentService = require('../services/agentService')
class PropertyController {
    // Retrieves all properties
  async getAllProperties(req, res) {
    try {
      const property = await propertyService.getAllProperties();
      res.json(property);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
// Retrieves a property by ID
  async getPropertyById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const property = await propertyService.getPropertyById(id);
      res.json(property);
    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
// Creates a new property
  async createProperty(req, res) {
    try {
      const { propertyName, propertyLocation, propertyStatus, propertyPrice, agentId } = req.body;
      const newProperty = await propertyService.createProperty( propertyName, propertyLocation, propertyStatus, propertyPrice, agentId );
      res.status(201).json(newProperty);
    } catch (error) {
      console.error('Error creating property:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
 // Updates property details by ID
  async updateProperty(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const {
        propertyName,
        propertyLocation,
        propertyPrice,
        bedroom,
        bathroom,
        garden,
        gardenArea,
        propertyStatus,
        propertyDetailsId,
        agentId
      } = req.body;
      const updateProperty = await propertyService.updateProperty(id, propertyName, propertyLocation, propertyStatus, propertyPrice, agentId);
      const updateDetails = await propertyDetailsService.updatePropertyDetails(propertyDetailsId, bedroom, bathroom, garden, gardenArea, id)
      const success = await propertyService.getAllProperties();
      //res.json({ message: 'Property updated successfully' });
      res.render('properties', {success: success})
    } catch (error) {
      console.error('Error updating property:', error);
      //res.status(500).json({ message: 'Internal server error' });
      res.render('500')
    }
  }
// Deletes a property by ID
  async deleteProperty(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const deleteFromAgent = await agentService.deletePropertyForAgent(id)
      const deleteFromDetails = await propertyDetailsService.deletePropertyDetailsFromProperty(id)
      const deleteFromFavorties = await favoritesService.deleteFavoritesFromProperty(id)
      const deleteFromTransactions = await transactionService.deleteTransactionFromProperty(id)
      const success = await propertyService.deleteProperty(id);
      //res.json({ message: 'Property deleted successfully' });
      res.redirect('/property/filter')
    } catch (error) {
      console.error('Error deleting property:', error);
     //res.status(500).json({ message: 'Internal server error' });
     res.render('500')
    }
  }
// Filters properties based on provided criteria 
  async filterProperties(req, res){
    try {
      const { filters } = req.body;
      const success = await propertyService.filterProperties(filters);

      //res.json({success});
      console.log("Success: ", success)

      res.render('properties', {success: success})
    } catch (error) {
      console.error('Error fetching desired properties:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async editForm(req, res) {
    try {
      const id = req.params.id
      console.log("The property id is: ", id)
      const property = await propertyService.getPropertyById(id)
      const agents = await agentService.getAllAgents();

      console.log("Agents", agents)

      console.log("Properties are: ", property)
      if(!property)
        res.render('500')

      res.render('propertiesEdit', {property: property, agents: agents})

    } catch (error) {
      console.log("error: ", error)
      res.render('500')
    }
  }
}

module.exports = new PropertyController();
