/*
  The AppointmentDetailsRoute class defines the routes to manage appointment details 
  and provides access to the controller functions responsible for handling each route.
  
  Validators are applied to ensure the credentials provided in the request are valid before 
  processing the controller logic.
*/

const express = require('express');
const appointmentDetailsController = require('../controllers/appointmentDetailsController');
const { validateAppointmentDetails, validateAppointmentDetailsId } = require('../validators/appointmentDetailsDTO');
const router = express.Router();

// Route to get all appointment details
// Calls the getAllAppointmentDetails method from the controller to fetch and return all appointment details.
router.get('/', (req, res) => appointmentDetailsController.getAllAppointmentDetails(req, res));

// Route to get a specific appointment detail by ID
// The validateAppointmentDetailsId middleware validates the provided ID before calling the controller method.
router.get('/:id', validateAppointmentDetailsId, (req, res) => appointmentDetailsController.getAppointmentDetailsById(req, res));

// Route to create a new appointment detail
// The validateAppointmentDetails middleware ensures the provided data is valid before calling the controller method.
router.post('/', validateAppointmentDetails, (req, res) => appointmentDetailsController.createAppointmentDetails(req, res));

// Route to update an appointment detail by ID
// The validateAppointmentDetails and validateAppointmentDetailsId middlewares ensure that both the data and ID are valid before calling the controller method.
//router.put('/:id', [validateAppointmentDetails, validateAppointmentDetailsId], (req, res) => appointmentDetailsController.updateAppointmentDetails(req, res));
router.post('/update/appointmentDetails/:id', [validateAppointmentDetails, validateAppointmentDetailsId], (req, res) => appointmentDetailsController.updateAppointmentDetails(req, res));

// Route to delete an appointment detail by ID
// The validateAppointmentDetailsId middleware ensures the provided ID is valid before calling the controller method to delete the appointment detail.
//router.delete('/:id', validateAppointmentDetailsId, (req, res) => appointmentDetailsController.deleteAppointmentDetails(req, res));
router.get('/delete/appointmentDdetails/:id', validateAppointmentDetailsId, (req, res) => appointmentDetailsController.deleteAppointmentDetails(req, res));

module.exports = router;
