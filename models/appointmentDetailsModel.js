/*
appointmentDetails model class to replicate the agent model in the database
*/

class AppointmentDetails {
  constructor(id, appointmentId, agentId, userId) {
    this.id = id;
    this.appointmentId = appointmentId
    this.agentId = agentId
    this.userId = userId
  }

  // Static method to map database row to Property model
  // mapper to map the datafields from database to our property Model
  static fromRow(row) {
    return new AppointmentDetails(
      row.appointment_details_id,    
      row.appointment_id,     
      row.agent_id,
      row.user_id
    );
  }
}

module.exports = AppointmentDetails;
