/*
  The appointmentRoute class defines the routes for managing appointments, providing access to the respective controller functions.
  Validators ensure that the provided credentials and data are valid before the controller processes the request.
*/

const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const { validateAppointment, validateAppointmentId } = require('../validators/appointmentDTO');
const router = express.Router();

// Route to get all appointments
// Calls the getAllAppointments method from the controller to fetch and return all appointments.
router.get('/', (req, res) => appointmentController.getAllAppointments(req, res));

// Route to get a specific appointment by ID
// The validateAppointmentId middleware ensures the validity of the ID before calling the controller to retrieve the appointment.
router.get('/:id', validateAppointmentId, (req, res) => appointmentController.getAppointmentById(req, res));

// Route to create a new appointment
// The validateAppointment middleware ensures the validity of the provided data before calling the controller method to create the appointment.
router.post('/', validateAppointment, (req, res) => appointmentController.createAppointment(req, res));

// Route to update an appointment by ID
// The validateAppointment and validateAppointmentId middlewares ensure that the provided data and ID are valid before updating the appointment.
//router.put('/:id', [validateAppointment, validateAppointmentId], (req, res) => appointmentController.updateAppointment(req, res));
router.post('/update/:id', (req, res) => appointmentController.updateAppointment(req, res));

router.get('/edit-form/:id', (req,res) => appointmentController.editForm(req,res))

// Route to delete an appointment by ID
// The validateAppointmentId middleware ensures the validity of the provided ID before calling the controller to delete the appointment.
//router.delete('/:id', validateAppointmentId, (req, res) => appointmentController.deleteAppointment(req, res));
router.post('/delete/:id', validateAppointmentId, (req, res) => appointmentController.deleteAppointment(req, res));

module.exports = router;
