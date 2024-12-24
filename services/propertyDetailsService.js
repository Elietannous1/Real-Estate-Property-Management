// Importing required modules
const { initDB } = require('../config/database'); // Database initialization function
const propertyDetails = require('../models/propertyDetailsModel'); // PropertyDetails model for handling property details data

// PropertyDetailsService class for handling property details-related operations
class propertyDetailsService {
  constructor() {
    this.pool = null;  // Initializes the pool property to null
    this.init();  // Calls the init method to set up the database connection
  }

  // Initializes the database connection
  async init() {
    this.pool = await initDB();  // Sets up the database connection pool
  }

  // Retrieves all property details from the database
  async getAllPropertyDetails() {
    const [rows] = await this.pool.query('SELECT * FROM property_details');  // Fetches all property details from the database
    return rows.map(propertyDetails.fromRow);  // Maps each row to a propertyDetails object using the fromRow method
  }

  // Creates a new property details entry in the database
  async createPropertyDetails(bedroom, bathroom, garden, gardenArea, propertyId) {
    const [result] = await this.pool.query(
      'INSERT INTO property_details (bedroom, bathroom, garden, garden_area, property_id) VALUES (?, ?, ?, ?, ?)', 
      [bedroom, bathroom, garden, gardenArea, propertyId]  // Inserts property details into the database
    );
    const insertedProperty = new propertyDetails(result.insertId, bedroom, bathroom, garden, gardenArea, propertyId);  // Creates a new propertyDetails object with the inserted ID
    return insertedProperty;  // Returns the newly created propertyDetails object
  }

  // Updates an existing property details entry in the database
  async updatePropertyDetails(id, bedroom, bathroom, garden, gardenArea, propertyId) {
    const [result] = await this.pool.query(
      'UPDATE property_details SET bedroom = ?, bathroom = ?, garden = ?, garden_area = ?, property_id = ? WHERE property_details_id = ?',
      [bedroom, bathroom, garden, gardenArea, propertyId, id]  // Executes the query to update the property details
    );
    return result.affectedRows > 0;  // Returns true if the update was successful, otherwise false
  }

  // Deletes a property details entry by its ID
  async deletePropertyDetails(id) {
    const [result] = await this.pool.query('DELETE FROM property_details WHERE property_details_id = ?', [id]);  // Deletes the property details by ID
    return result.affectedRows > 0;  // Returns true if the deletion was successful, otherwise false
  }

  async deletePropertyDetailsFromProperty(id){
  const [result] = await this.pool.query('DELETE FROM property_details WHERE property_id = ?', [id])
  return result.affectedRows > 0;
  }
}



// Exports an instance of the PropertyDetailsService class
module.exports = new propertyDetailsService();
