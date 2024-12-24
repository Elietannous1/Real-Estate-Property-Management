/*
payment model class to replicate the agent model in the database
*/

class Payment {
  constructor(id, amount, date, method, transactionId) {
    this.id = id;
    this.amount = amount
    this.date = date,
    this.method = method,
    this.transactionId = transactionId
  }

  // Static method to map database row to Property model
  // mapper to map the datafields from database to our property Model
  static fromRow(row) {
    return new Payment(
      row.payment_id,
      row.payment_amount,
      row.payment_date,
      row.payment_method,
      row.transaction_id   
    );
  }
}

module.exports = Payment;
