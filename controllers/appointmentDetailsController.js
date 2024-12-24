// controllers/appointmentdetailsController.js
const appointmentDetailsService = require('../services/appointmentDetailsService');

class AppointmentDetailsController {
    
  // Get all appointment details from the database
  async getAllAppointmentDetails(req, res) {
    try {
      const appointmentDetails = await appointmentDetailsService.getAllAppointmentDetails(); // Fetch all appointment details from the service
      res.json(appointmentDetails); // Return appointment details as JSON
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }

  // Get a specific appointment detail by its ID
  async getAppointmentDetailsById(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Extract appointment detail ID from request params
      const appointmentDetails = await appointmentDetailsService.getAppointmentDetailsById(id); // Fetch appointment details by ID
      res.json(appointmentDetails); // Return the appointment details as JSON
    } catch (error) {
      console.error('Error fetching appointment details:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }

  // Create a new appointment detail with appointmentId, agentId, and userId
  async createAppointmentDetails(req, res) {
    try {
      const { appointmentId, agentId, userId } = req.body; // Extract data from request body
      const newAppointmentDetails = await appointmentDetailsService.createAppointmentDetails(appointmentId, agentId, userId); // Create a new appointment detail
      res.status(201).json(newAppointmentDetails); // Return the newly created appointment detail with a 201 status
    } catch (error) {
      console.error('Error creating appointment details:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }

  // Update an existing appointment detail by its ID
  async updateAppointmentDetails(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Extract appointment detail ID from request params
      const { appointmentId, agentId, userId } = req.body; // Extract updated data from request body
      const success = await appointmentDetailsService.updateAppointmentDetails(id, appointmentId, agentId, userId); // Update the appointment detail
      res.json({ message: 'Appointment Details updated successfully' }); // Return success message
    } catch (error) {
      console.error('Error updating appointment details:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }

  // Delete an appointment detail by its ID
  async deleteAppointmentDetails(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Extract appointment detail ID from request params
      const success = await appointmentDetailsService.deleteAppointmentDetails(id); // Delete the appointment detail by ID
      res.json({ message: 'Appointment Details deleted successfully' }); // Return success message
    } catch (error) {
      console.error('Error deleting appointment details:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }
}

module.exports = new AppointmentDetailsController();
