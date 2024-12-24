/*
User model class to replicate the agent model in the database
*/

class User {
  constructor(id, name, email, hashedPassword, location) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.location = location;
  }

  // Static method to map database row to User model
  // mapper to map the datafields from database to our user Model
  static fromRow(row) {
    return new User(
      row.user_id,    
      row.user_name,     
      row.user_email,
      row.user_password,
      row.user_location 
    );
  }
}
module.exports = User;
