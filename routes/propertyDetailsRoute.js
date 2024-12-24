/*
  The propertyDetailsRoute class defines the routes for managing property details.
  Validators are used to ensure the data provided is valid for each request.
*/

const express = require('express');
const propertyDetailsController = require('../controllers/propertyDetailsController');
const { validatePropertyDetails, validatePropertyDetailsId } = require('../validators/propertyDetailsDTO');
const router = express.Router();

// Route to get all property details
// Calls the getAllPropertyDetails method in the propertyDetailsController to retrieve all property details records.
router.get('/', (req, res) => propertyDetailsController.getAllPropertyDetails(req, res));

// Route to create new property details
// Calls the createPropertyDetails method in the propertyDetailsController, with validation for the provided data.
router.post('/', validatePropertyDetails, (req, res) => propertyDetailsController.createPropertyDetails(req, res));

// Route to update an existing property details entry
// Calls the updatePropertyDetails method in the propertyDetailsController, with validation for the data and ID.
//router.put('/:id', [validatePropertyDetails, validatePropertyDetailsId], (req, res) => propertyDetailsController.updatePropertyDetails(req, res));
router.post('/update/propertyDetails/:id', [validatePropertyDetails, validatePropertyDetailsId], (req, res) => propertyDetailsController.updatePropertyDetails(req, res));

// Route to delete property details by ID
// Calls the deletePropertyDetails method in the propertyDetailsController, with validation for the ID.
//router.delete('/:id', validatePropertyDetailsId, (req, res) => propertyDetailsController.deletePropertyDetails(req, res));
router.get('/delete/propertyDetails:id', validatePropertyDetailsId, (req, res) => propertyDetailsController.deletePropertyDetails(req, res));

module.exports = router;
