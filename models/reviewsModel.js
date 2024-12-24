/*
reviews model class to replicate the agent model in the database
*/

class Reviews {
  constructor(id, comment, rating, userId, agentId) {
    this.id = id;
    this.comment = comment
    this.rating = rating,
    this.userId = userId,
    this.agentId = agentId
  }

  // Static method to map database row to Property model
  // mapper to map the datafields from database to our property Model
  static fromRow(row) {
    return new Reviews(
      row.review_id,
      row.review_comment,
      row.review_rating,
      row.user_id,
      row.agent_id 
    );
  }
}

module.exports = Reviews;
