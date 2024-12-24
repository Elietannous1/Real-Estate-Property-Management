/*
transaction model class to replicate the agent model in the database
*/

class Transaction {
  constructor(id, date, type, price, userId, agentId, propertyId) {
    this.id = id;
    this.date = date
    this.type = type,
    this.price = price,
    this.userId = userId,
    this.agentId = agentId,
    this.propertyId = propertyId
  }

  // Static method to map database row to Property model
  // mapper to map the datafields from database to our property Model
  static fromRow(row) {
    return new Transaction(
      row.transaction_id,
      row.transaction_date,
      row.transaction_type,
      row.transaction_price,
      row.user_id,
      row.agent_id,
      row.property_id   
    );
  }
}

module.exports = Transaction;
