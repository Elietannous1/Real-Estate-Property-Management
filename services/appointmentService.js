// Importing database initialization function and the Appointment model
const { initDB } = require('../config/database');
const appointment = require('../models/appointmentModel');

// AppointmentService class for managing appointment data in the database
class AppointmentService {
  constructor() {
    this.pool = null;  // Initializes the pool property as null
    this.init();  // Calls the init method to initialize the database connection
  }

  // Initializes the database connection pool
  async init() {
    this.pool = await initDB();  // Sets the pool to the initialized DB connection
  }

  // Fetches all appointments from the database
  async getAllAppointments() {
    const query = `
      SELECT 
        a.appointment_id,
        a.appointment_status,
        a.appointment_date,
        ad.appointment_details_id,
        u.user_name, -- Assuming username is the column name in the user table
        ag.agent_name -- Assuming agent_name is the column name in the agent table
      FROM 
        appointment a
      JOIN 
        appointment_details ad ON a.appointment_id = ad.appointment_id
      JOIN 
        user u ON ad.user_id = u.user_id -- Adjust this ON clause based on your schema
      JOIN 
        agent ag ON ad.agent_id = ag.agent_id; -- Adjust this ON clause based on your schema
    `;
  
    const [rows] = await this.pool.query(query); // Execute the query
    console.log("query answers: ", rows)
    return rows.map(row => ({
      appointmentId: row.appointment_id,
      appointmentStatus: row.appointment_status,
      appointmentDate: row.appointment_date,
      appointmentDetailsId: row.appointment_details_id,
      username: row.user_name, // Include the username
      agentName: row.agent_name, // Include the agent name
    }));
  }
  
  

  // Fetches a specific appointment by its ID
  async getAppointmentById(id) {
    const [rows] = await this.pool.query(
      `
      SELECT 
        a.appointment_id AS appointmentId,
        a.appointment_status AS appointmentStatus,
        a.appointment_date AS appointmentDate,
        ad.appointment_details_id AS appointmentDetailsId,
        u.user_name AS username,
        ag.agent_name AS agentName
      FROM 
        appointment AS a
      LEFT JOIN 
        appointment_details AS ad 
        ON a.appointment_id = ad.appointment_id
      LEFT JOIN 
        user AS u 
        ON ad.user_id = u.user_id
      LEFT JOIN 
        agent AS ag 
        ON ad.agent_id = ag.agent_id
      WHERE 
        a.appointment_id = ?
      `, 
      [id]
    );
  
    if (rows.length === 0) return null; // Return null if no matching appointment is found
  
    // Group appointment details if needed
    const appointment = {
      appointmentId: rows[0].appointmentId,
      appointmentStatus: rows[0].appointmentStatus,
      appointmentDate: rows[0].appointmentDate,
      username: rows[0].username,
      agentName: rows[0].agentName,
      appointmentDetails: rows.map(row => ({
        appointmentDetailsId: row.appointmentDetailsId,
      })),
    };
  
    return appointment;
  }
  

  // Creates a new appointment and inserts it into the database
  async createAppointment(date, status) {
    const [result] = await this.pool.query(
      'INSERT INTO appointment (appointment_date, appointment_status) VALUES (?, ?)',  // SQL insert query
      [date, status]  // Values to be inserted
    );
    const insertedAppointment = new appointment(result.insertId, date, status);  // Creates a new Appointment object
    return insertedAppointment;  // Returns the newly created appointment object
  }

  // Updates an existing appointment in the database
  async updateAppointment(id, date, status) {
    const [result] = await this.pool.query(
      'UPDATE appointment SET appointment_date = ?, appointment_status = ? WHERE appointment_id = ?',  // SQL update query
      [date, status, id]  // Values to update
    );
    return result.affectedRows > 0;  // Returns true if the update was successful (affected rows > 0)
  }

  // Deletes an appointment from the database
  async deleteAppointment(id) {
    const [result] = await this.pool.query('DELETE FROM appointment WHERE appointment_id = ?', [id]);  // SQL delete query
    return result.affectedRows > 0;  // Returns true if the deletion was successful (affected rows > 0)
  }
}

// Exports a new instance of the AppointmentService class
module.exports = new AppointmentService();
