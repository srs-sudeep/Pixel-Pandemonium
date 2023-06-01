//controllers/transactionController.js
const Transaction = require('../models/transaction');

// Display index page
exports.index = (req, res) => {
  res.render('index');
};

// Create transaction
exports.transaction_create = (req, res) => {
  const transaction = new Transaction({
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date,
    type: req.body.type
  });

  transaction.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

// Display detail page for a specific transaction
exports.transaction_detail = (req, res) => {
  Transaction.findById(req.params.id, (err, transaction) => {
    if (err) {
      return next(err);
    }
    res.render('transaction_detail', {transaction: transaction});
  });
};

// Display list of all transactions
exports.transaction_list = (req, res) => {
  Transaction.find({}, (err, transactions) => {
    if (err) {
      return next(err);
    }
    res.render('transaction_list', {transactions: transactions});
  });
};

// Update
exports.transaction_update = (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, transaction) => {
      if (err) {
        return next(err);
      }
      res.redirect(transaction.url);
    });
  };
  
  
  // Delete
  exports.transaction_delete = (req, res) => {
    Transaction.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  };
