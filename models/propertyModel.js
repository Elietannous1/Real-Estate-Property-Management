/*
Property model class to replicate the agent model in the database
*/

class Property {
  constructor(id, propertyName, propertyLocation, propertyStatus, propertyPrice, agentId) {
    this.id = id;
    this.propertyName = propertyName;
    this.propertyLocation = propertyLocation;
    this.propertyStatus = propertyStatus;
    this.propertyPrice = propertyPrice;
    this.agentId = agentId;
  }

  // Static method to map database row to Property model
  // mapper to map the datafields from database to our property Model
  static fromRow(row) {
    return new Property(
      row.property_id,    
      row.property_name,     
      row.property_location,
      row.property_status,
      row.property_price,
      row.agent_id
    );
  }
}
class FilteredProperty {
  constructor(propertyId, propertyDetailsId, agentId, propertyName, propertyLocation, propertyStatus, propertyPrice, bedroom, bathroom, garden, gardenArea){
    this.propertyId = propertyId;
    this.propertyDetailsId = propertyDetailsId
    this.agentId = agentId;
    this.propertyName = propertyName;
    this.propertyLocation = propertyLocation;
    this.propertyStatus = propertyStatus;
    this.propertyPrice = propertyPrice;
    this.bedroom = bedroom;
    this.bathroom = bathroom;
    this.garden = garden;
    this.gardenArea = gardenArea;
    
  }
  static fromFilteredRow(row){
    return new FilteredProperty(
    row.property_id,
    row.property_details_id,
    row.agent_id,
    row.property_name,     
    row.property_location,
    row.property_status,
    row.property_price,
    row.bedroom,
    row.bathroom,
    row.garden,
    row.gardenArea 
    )
  }
}

module.exports = {Property, FilteredProperty};
