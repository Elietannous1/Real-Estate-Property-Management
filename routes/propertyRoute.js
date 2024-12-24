/*
  The propertyRoute class defines the routes for managing property records.
  Validators are used to ensure the data provided is valid for each request.
*/

const express = require('express');
const propertyController = require('../controllers/propertyController');
const { validateProperty, validatePropertyId } = require('../validators/propertyDTO');
const router = express.Router();

// Route to get all properties
// Calls the getAllProperties method in the propertyController to retrieve all property records.
router.get('/', (req, res) => propertyController.getAllProperties(req, res));

// Route to filter properties based on certain criteria
// Calls the filterProperties method in the propertyController to filter properties.
router.get('/filter', (req, res) => propertyController.filterProperties(req, res));

// Route to get a property by ID
// Calls the getPropertyById method in the propertyController, with validation for the provided ID.
router.get('/:id', validatePropertyId, (req, res) => propertyController.getPropertyById(req, res));

// Route to create a new property
// Calls the createProperty method in the propertyController, with validation for the provided data.
router.post('/', validateProperty, (req, res) => propertyController.createProperty(req, res));


router.get('/edit-form/:id', validatePropertyId, (req, res) => propertyController.editForm(req,res))

// Route to update an existing property by ID
// Calls the updateProperty method in the propertyController, with validation for the data and ID.
//router.put('/:id', [validateProperty, validatePropertyId], (req, res) => propertyController.updateProperty(req, res));
router.post('/update/:id', [validateProperty, validatePropertyId], (req, res) => propertyController.updateProperty(req, res));



// Route to delete a property by ID
// Calls the deleteProperty method in the propertyController, with validation for the ID.
//router.delete('/:id', validatePropertyId, (req, res) => propertyController.deleteProperty(req, res));
router.post('/delete/:id', validatePropertyId, (req, res) => propertyController.deleteProperty(req, res));

module.exports = router;
