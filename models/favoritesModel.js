/*
Favorites model class to replicate the agent model in the database
*/

class Favorites {
  constructor(id, note, userId, propertyId) {
    this.id = id;
    this.note = note;
    this.userId = userId;
    this.propertyId = propertyId;
  }

  // Static method to map database row to Property model
  // mapper to map the datafields from database to our property Model
  static fromRow(row) {
    return new Favorites(
      row.favorites_id,
      row.note,
      row.user_id,
      row.property_id    
    );
  }
}

module.exports = Favorites;
