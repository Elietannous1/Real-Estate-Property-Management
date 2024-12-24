// controllers/appointmentController.js
const appointmentService = require('../services/appointmentService');
const appointmentDetailsService = require('../services/appointmentDetailsService')
const agentService = require('../services/agentService')

class AppointmentController {
    
  // Get all appointments from the service
  async getAllAppointments(req, res) {
    try {
      const appointments = await appointmentService.getAllAppointments(); // Fetch all appointments
      //res.json(appointment); // Return appointments as JSON
      console.log("appointments are: ", appointments)
      res.render('appointment', {appointments: appointments})
    } catch (error) {
      console.error('Error fetching appointments:', error);
      //res.status(500).json({ message: 'Internal server error' }); // Handle errors
      res.render('500')
    }
  }

  // Get a specific appointment by its ID
  async getAppointmentById(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Extract appointment ID from request params
      const appointment = await appointmentService.getAppointmentById(id); // Fetch appointment by ID
      res.json(appointment); // Return the appointment as JSON
    } catch (error) {
      console.error('Error fetching appointment:', error);
      //res.status(500).json({ message: 'Internal server error' }); // Handle errors
      res.render('500')
    }
  }

  // Create a new appointment with date and status
  async createAppointment(req, res) {
    try {
      const { date, status } = req.body; // Extract date and status from the request body
      const newAppointment = await appointmentService.createAppointment(date, status); // Create a new appointment
      res.status(201).json(newAppointment); // Return the newly created appointment with a 201 status
    } catch (error) {
      console.error('Error creating appointment:', error);
      //res.status(500).json({ message: 'Internal server error' }); // Handle errors
      res.render('500')
    }
  }

  // Update an existing appointment by its ID
  async updateAppointment(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Extract appointment ID from request params
      const { date, status } = req.body; // Extract updated date and status from the request body
      const success = await appointmentService.updateAppointment(id, date, status); // Update the appointment
      //res.json({ message: 'Appointment updated successfully' }); // Return success message
      res.redirect('/appointment')
    } catch (error) {
      console.error('Error updating appointment:', error);
      //res.status(500).json({ message: 'Internal server error' }); // Handle errors
      res.render('500')
    }
  }

  // Delete an appointment by its ID
  async deleteAppointment(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Extract appointment ID from request params
      const deleteDetails = await appointmentDetailsService.deleteAppointmentDetailsfromAppointmentId(id)
      const success = await appointmentService.deleteAppointment(id); // Delete the appointment by ID
      //res.json({ message: 'Appointment deleted successfully' }); // Return success message
      res.redirect('/appointment')
    } catch (error) {
      console.error('Error deleting appointment:', error);
      //res.status(500).json({ message: 'Internal server error' }); // Handle errors
      res.render('500')
    }
  }

  async editForm(req,res) {
    try {
      const id = req.params.id
      console.log("The apppointment id is: ", id)
      const appointment = await appointmentService.getAppointmentById(id)
      const agents = await agentService.getAllAgents();

      console.log("Agents", agents)

      console.log("appointments are: ", appointment)
      if(!appointment)
        res.render('500')

      res.render('editAppointment', {appointment: appointment, agents: agents, validStatuses: [
        'Pending',
        'Confirmed',
        'Canceled',
        'Rescheduled',
        'Completed',
        'No-Show',
        'In Progress'
      ]})

    } catch (error) {
      console.log("error: ", error)
      res.render('500')
    }
  }
}

module.exports = new AppointmentController();
