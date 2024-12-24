/*
Favorites model class to replicate the agent model in the database
*/

class Favorites {
  constructor(id, content, dateSent) {
    this.id = id;
    this.content = content
    this.dateSent = dateSent
  }

  // Static method to map database row to Property model
  // mapper to map the datafields from database to our property Model
  static fromRow(row) {
    return new Favorites(
      row.message_id,
      row.content,
      row.date_sent   
    );
  }
}

module.exports = Favorites;
