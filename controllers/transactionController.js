//controllers/transactionController.js
const Transaction = require("../models/transaction");

// Display index page
exports.index = (req, res) => {
  res.render("index");
};

// Create transaction
exports.transaction_create = (req, res, next) => {
  const transaction = new Transaction({
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date,
    type: req.body.type,
  });

  transaction
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
};

// Display detail page for a specific transaction
exports.transaction_detail = (req, res, next) => {
  Transaction.findById(req.params.id)
    .then((transaction) => {
      if (!transaction) {
        // Transaction not found
        return res.status(404).send("Transaction not found");
      }
      res.render("transaction_detail", { transaction: transaction });
    })
    .catch((err) => {
      next(err);
    });
};

// Display list of all transactions
exports.transaction_list = (req, res, next) => {
  Transaction.find({})
    .then((transactions) => {
      res.render("transaction_list", { transactions: transactions });
    })
    .catch((err) => {
      next(err);
    });
};

// Update
exports.transaction_update = (req, res, next) => {
  Transaction.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((transaction) => {
      if (!transaction) {
        // Transaction not found
        return res.status(404).send("Transaction not found");
      }
      res.redirect(transaction.url);
    })
    .catch((err) => {
      next(err);
    });
};

// Delete
exports.transaction_delete = (req, res, next) => {
  Transaction.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
};
