//controllers/transactionController.js
const Transaction = require("../models/transaction");
const User = require("../models/user");

// Display index page
exports.index = (req, res) => {
  const {userId}  = req.params;
  console.log({userId});
  if (req.session.userId !== userId) {
    return res.redirect('/signin');
  }

  const user =  User.findById(userId);
  if (!user) {
    res.redirect('/signin');
  }
  const transactions = Array.from(Transaction.find({ userId }));

  res.render("index",{user, transactions});
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
    return res.redirect('/signin');
  } 
  const user = User.findById(userId);
  if (!user) {
    return res.redirect('/signin');
  }

  const transaction = Transaction.findById(transactionId);
  if (!transaction || transaction.userId.toString() !== userId) {
    return res.redirect('/signin');
  }
  res.render('editTransaction', { user, transaction });
};

exports.transaction_post_edit = (req, res, next) => {
  const { userId, transactionId } = req.params;
  const { amount, date, description, type } = req.body;

  try {
    const transaction = Transaction.findById(transactionId);
    if (!transaction || transaction.userId.toString() !== userId) {
      return res.redirect('/signin');
    }

    transaction.amount = amount;
    transaction.date = date;
    transaction.description = description;
    transaction.type = type;
    transaction.save();

    res.redirect(`/${userId}/transaction`);
  } catch (error) {
    console.error(error);
    res.redirect(`/${userId}/transaction`);
  }
};



// Delete
exports.transaction_delete = (req, res, next) => {
  const { userId, transactionId } = req.params;

  if (req.session.userId !== userId) {
    return res.redirect('/signin');
  }

  const user = User.findById(userId);
  if (!user) {
    return res.redirect('/signin');
  }

  const transaction =  Transaction.findById(transactionId);
  if (!transaction || transaction.userId.toString() !== userId) {
    return res.redirect('/signin');
  }

  Transaction.findByIdAndDelete(transactionId);

  res.redirect(`/${userId}/transaction`);
};
