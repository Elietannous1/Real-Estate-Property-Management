/*
Appointment model class to replicate the agent model in the database
*/

class Appointment {
  constructor(id, appointmentDate, appointmentStatus) {
    this.id = id;
    this.appointmentDate = appointmentDate;
    this.appointmentStatus = appointmentStatus;
  }

  // Static method to map database row to Property model
  // mapper to map the datafields from database to our property Model
  static fromRow(row) {
    return new Appointment(
      row.property_id,    
      row.appointment_date,     
      row.appointment_status
    );
  }
}

module.exports = Appointment;
