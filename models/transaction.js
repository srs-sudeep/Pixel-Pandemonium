  //models/transaction.js
  const mongoose = require('mongoose');
  const moment = require('moment');
  
  const Schema = mongoose.Schema;
  
  const TransactionSchema = new Schema(
    {
      description: {type: String, required: true, max: 100},
      amount: {type: Number, required: true},
      date: {type: Date, default: Date.now},
      type: {type: String, required: true, enum: ['Income', 'Expense']}
    }
  );
  
  TransactionSchema
    .virtual('url')
    .get(function() {
      return '/transaction/' + this._id;
    });
  
  TransactionSchema
    .virtual('date_formatted')
    .get(function() {
      return moment(this.date).format('MMMM Do, YYYY');
    });
  
  
  module.exports = mongoose.model('Transaction', TransactionSchema);
