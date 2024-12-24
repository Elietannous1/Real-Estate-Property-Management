/*
messsage Recipients model class to replicate the agent model in the database
*/

class MessageRecipients {
  constructor(id, userId, agentId, messageId) {
    this.id = id;
    this.userId = userId
    this.agentId = agentId
    this.messageId = messageId
  }

  // Static method to map database row to Property model
  // mapper to map the datafields from database to our property Model
  static fromRow(row) {
    return new MessageRecipients(
      row.message_recipients_id,
      row.user_id,
      row.agent_id,
      row.message_id  
    );
  }
}

module.exports = MessageRecipients;
