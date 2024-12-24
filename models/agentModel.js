/*
Agent model class to replicate the agent model in the database
*/

class Agent {
  constructor(id, name, email, password, propertyId) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.propertyId = propertyId;
  }

  // Static method to map database row to Agent model
  // mapper to map the datafields from database to our Agent Model
  static fromRow(row) {
    return new Agent(
      row.agent_id,    
      row.agent_name,     
      row.agent_email,
      row.agent_password,
      row.property_id
    );
  }
}

module.exports = Agent;
