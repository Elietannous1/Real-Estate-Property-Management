// Importing database initialization function and the AppointmentDetails model
const { initDB } = require('../config/database');
const appointmentDetails = require('../models/appointmentDetailsModel');

// AppointmentDetailsService class provides methods for managing appointment details in the database
class AppointmentDetailsService {
  constructor() {
    this.pool = null;  // Initialize the pool as null, will be set in init()
    this.init();  // Call init method to set up database connection
  }

  // Initializes the database connection
  async init() {
    this.pool = await initDB();  // Set up DB connection pool
  }

  // Fetches all appointment details from the database
  async getAllAppointmentDetails() {
    const [rows] = await this.pool.query('SELECT * FROM appointment_details');  // Query to get all appointment details
    return rows.map(appointmentDetails.fromRow);  // Map each row to an instance of the AppointmentDetails model
  }

  // Fetches a specific appointment detail by its ID
  async getAppointmentDetailsById(id) {
    const [rows] = await this.pool.query('SELECT * FROM appointment_details WHERE appointment_details_id = ?', [id]);  // Query for specific appointment detail
    if (rows.length === 0) return null;  // If no result, return null
    return appointmentDetails.fromRow(rows[0]);  // Map the result to an AppointmentDetails object and return it
  }

  // Creates a new appointment detail and inserts it into the database
  async createAppointmentDetails(appointmentId, agentId, userId) {
    const [result] = await this.pool.query(
      'INSERT INTO appointment_details (appointment_id, agent_id, user_id) VALUES (?, ?, ?)',  // SQL insert query
      [appointmentId, agentId, userId]  // Values to be inserted
    );
    const insertedAppointmentDetails = new appointmentDetails(appointmentId, agentId, userId);  // Create a new AppointmentDetails object
    return insertedAppointmentDetails;  // Return the created appointment detail
  }

  // Updates an existing appointment detail in the database
  async updateAppointmentDetails(id, appointmentId, agentId, userId) {
    const [result] = await this.pool.query(
      'UPDATE appointment_details SET appointment_id = ?, agent_id= ?, user_id = ? WHERE appointment_details_id = ?',  // SQL update query
      [appointmentId, agentId, userId, id]  // Values to be updated
    );
    return result.affectedRows > 0;  // Return true if update was successful (affected rows > 0)
  }

  // Deletes an appointment detail from the database
  async deleteAppointmentDetails(id) {
    const [result] = await this.pool.query('DELETE FROM appointment_details WHERE appointment_details_id = ?', [id]);  // SQL delete query
    return result.affectedRows > 0;  // Return true if deletion was successful (affected rows > 0)
  }

  async deleteAppointmentDetailsfromAppointmentId(id){
    const [result] = await this.pool.query('DELETE FROM appointment_details WHERE appointment_id = ?', [id])
    return result.affectedRows > 0
  }
}

// Exporting a new instance of AppointmentDetailsService
module.exports = new AppointmentDetailsService();
