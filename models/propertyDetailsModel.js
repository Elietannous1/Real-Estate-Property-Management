/*
property details model class to replicate the agent model in the database
*/

class PropertyDetails {
  constructor(id, bedroom, bathroom, garden, gardenArea, propertyId) {
    this.id = id;
    this.bedroom = bedroom;
    this.bathroom = bathroom;
    this.garden = garden;
    this.gardenArea = gardenArea;
    this.propertyId = propertyId;

  }

  // Static method to map database row to Property model
  // mapper to map the datafields from database to our property Model
  static fromRow(row) {
    return new PropertyDetails(
      row.property_details_id,    
      row.bedroom,     
      row.bathroom,
      row.garden,
      row.garden_area,
      row.property_id 
    );
  }
}

module.exports = PropertyDetails;
