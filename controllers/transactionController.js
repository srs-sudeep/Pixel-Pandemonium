//controllers/transactionController.js
const Transaction = require("../models/transaction");
const User = require("../models/user");

// Display index page
exports.index = (req, res, next) => {
  const { userId } = req.params;
  if (req.session.userId !== userId) {
    return res.redirect("/signin");
  }
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.redirect("/signin");
      }
      Transaction.find({ userId: userId })
        .then((transactions) => {
          if (!transactions) {
            transactions = [];
          } 
          res.render("index", { user, transactions });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

// Create transaction
exports.transaction_create = (req, res, next) => {
  const { userId } = req.params;
  const { amount, date, description, type } = req.body;
  const transaction = new Transaction({
    userId,
    amount,
    date,
    description,
    type,
  });

  transaction
    .save()
    .then(() => {
      console.log("Transaction created");
      res.redirect(`/${userId}/transaction`);
    })
    .catch((err) => {
      next(err);
    });
};

// Display detail page for a specific transaction
exports.transaction_edit = (req, res, next) => {
  const { userId, transactionId } = req.params;
  if (req.session.userId !== userId) {
    return res.redirect("/signin");
  }
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/signin");
      }
      Transaction.findById(transactionId)
        .then((transaction) => {
          if (!transaction || transaction.userId.toString() !== userId) {
            return res.redirect("/signin");
          }
          res.render("editTransaction", { user, transaction });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.transaction_post_edit = (req, res, next) => {
  const { userId, transactionId } = req.params;
  const { amount, date, description, type } = req.body;
  try {
    Transaction.findById(transactionId)
      .then((transaction) => {
        if (!transaction || transaction.userId.toString() !== userId) {
          return res.redirect("/signin");
        }
        transaction.amount = amount;
        transaction.date = date;
        transaction.description = description;
        transaction.type = type;
        transaction
          .save()
          .then(() => {
            res.redirect(`/${userId}/transaction`);
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  } catch (error) {
    console.error(error);
    res.redirect(`/${userId}/transaction`);
  }
};

// Delete
exports.transaction_delete = (req, res, next) => {
  const { userId, transactionId } = req.params;

  if (req.session.userId !== userId) {
    return res.redirect("/signin");
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/signin");
      }
      Transaction.findById(transactionId)
        .then((transaction) => {
          if (!transaction || transaction.userId.toString() !== userId) {
            return res.redirect("/signin");
          }
          Transaction.findByIdAndDelete(transactionId)
            .then(() => {
              res.redirect(`/${userId}/transaction`);
            })
            .catch((err) => {
              next(err);
            });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};
