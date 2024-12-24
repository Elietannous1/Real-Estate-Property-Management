// Importing required modules
const { initDB } = require('../config/database');  // Initializes the database connection
const { Property, FilteredProperty } = require('../models/propertyModel');  // Property and FilteredProperty models

// propertyService class for handling property-related operations
class propertyService {
  constructor() {
    this.pool = null;  // Initializes the pool property to null
    this.init();  // Calls init method to set up the database connection
  }

  // Initializes the database connection
  async init() {
    this.pool = await initDB();  // Sets up the database connection pool
  }

  // Retrieves all properties from the database
  async getAllProperties() {
    let query = `
      SELECT p.*, pd.*
      FROM property p
      LEFT JOIN property_details pd ON p.property_id = pd.property_id
      WHERE 1=1
    `;
    const [rows] = await this.pool.query(query);  // Fetches all properties from the database
    return rows.map(FilteredProperty.fromFilteredRow);  // Maps each row to a Property object using fromRow method
  }

  // Retrieves a specific property by ID
  async getPropertyById(id) {
    const query = `
      SELECT 
        p.*, 
        pd.bedroom, 
        pd.bathroom, 
        pd.garden, 
        pd.garden_area 
      FROM 
        property p
      LEFT JOIN 
        property_details pd 
      ON 
        p.property_id = pd.property_id
      WHERE 
        p.property_id = ?
    `;
  
    const [rows] = await this.pool.query(query, [id]); // Fetches property and details by ID
    console.log("Rows from propertyId function:", rows);
  
    if (rows.length === 0) return null; // If no rows are found, return null
  
    const row = rows[0];
    return {
      id: row.property_id,
      propertyName: row.property_name,
      propertyLocation: row.property_location,
      propertyStatus: row.property_status,
      propertyPrice: row.property_price,
      agentId: row.agent_id,
      bedroom: row.bedroom,
      bathroom: row.bathroom,
      garden: row.garden,
      gardenArea: row.garden_area
    };
  }
  
  

  // Creates a new property in the database
  async createProperty(name, location, status, price, agentID) {
    const [result] = await this.pool.query(
      'INSERT INTO property (property_name, property_location, property_status, property_price, agent_id) VALUES (?, ?, ?, ?, ?)',
      [name, location, status, price, agentID]  // Inserts the property into the database
    );
    const insertedProperty = new Property(result.insertId, name, location, status, price, agentID);  // Creates a new Property object with the inserted ID
    return insertedProperty;  // Returns the newly created Property object
  }

  // Updates an existing property in the database
  async updateProperty(id, name, location, status, price, agentID) {
    const [result] = await this.pool.query(
      'UPDATE property SET property_name = ?, property_location = ?, property_status = ?, property_price = ?, agent_id = ? WHERE property_id = ?',
      [name, location, status, price, agentID, id]  // Executes the query to update the property
    );
    return result.affectedRows > 0;  // Returns true if the update was successful, otherwise false
  }

  // Deletes a property by ID
  async deleteProperty(id) {
    const [result] = await this.pool.query('DELETE FROM property WHERE property_id = ?', [id]);  // Deletes the property by its ID
    return result.affectedRows > 0;  // Returns true if the deletion was successful, otherwise false
  }

  // Filters properties based on various filters
  async filterProperties(filters) {
    console.log("Filters received:", filters);  // Logs the filters for debugging
    let query = `
      SELECT p.*, pd.*
      FROM property p
      LEFT JOIN property_details pd ON p.property_id = pd.property_id
      WHERE 1=1
    `;

    const params = [];  // Array to hold query parameters

    // Apply filters based on provided values
    if (filters?.priceRange) {
      query += ' AND p.property_price BETWEEN ? AND ?';  // Adds price range filter to the query
      params.push(filters.priceRange.min, filters.priceRange.max);
    }

    if (filters?.location) {
      query += ' AND p.property_location = ?';  // Adds location filter to the query
      params.push(filters.location);
    }

    if (filters?.agentId) {
      query += ' AND p.agent_id = ?';  // Adds agent ID filter to the query
      params.push(filters.agentId);
    }

    if (filters?.status) {
      query += ' AND p.property_status = ?';  // Adds status filter to the query
      params.push(filters.status);
    }

    if (filters?.features) {
      if (filters?.features?.bedrooms) {
        query += ' AND pd.bedroom = ?';  // Adds bedroom filter to the query
        params.push(filters.features.bedrooms);
      }
      if (filters?.features?.bathrooms) {
        query += ' AND pd.bathroom = ?';  // Adds bathroom filter to the query
        params.push(filters.features.bathrooms);
      }
      if (filters?.features?.gardenArea) {
        query += ' AND pd.garden_area BETWEEN ? AND ?';  // Adds garden area range filter to the query
        params.push(filters.features.gardenArea.min, filters.features.gardenArea.max);
      }
    }

    // Logs the final query and parameters for debugging
    //console.log('Query: ', query);
    //console.log('Filters: ', filters);
    //console.log('Params: ', params);

    const [rows] = await this.pool.query(query, params);  // Executes the query with the specified parameters
    if (rows.length === 0) {
      throw new Error("No rows returned from query");  // If no results, throw an error
    }

    // Logs the rows returned by the query for debugging
    console.log('rows', rows);

    return rows.map(FilteredProperty.fromFilteredRow);  // Maps each row to a FilteredProperty object using fromFilteredRow method
  }
}

// Exports an instance of the propertyService class
module.exports = new propertyService();
