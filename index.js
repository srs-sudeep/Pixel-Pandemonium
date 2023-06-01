//Create a web-based personal finance tracker using JavaScript, HTML, and CSS. The application should allow users to add, edit, and delete income and expense transactions and display the current balance. 
//give me the complete code for the index.js file
//index.js
// Require node modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set up static directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
const routes = require('./routes/index');
app.use('/', routes);

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
//routes/index.js
const express = require('express');
const router = express.Router();

// Require controller modules
const transaction_controller = require('../controllers/transactionController');

// Routes for transactions
router.get('/', transaction_controller.index);
router.post('/transaction/create', transaction_controller.transaction_create);
router.get('/transaction/:id', transaction_controller.transaction_detail);
router.get('/transactions', transaction_controller.transaction_list);
router.put('/transaction/:id/update', transaction_controller.transaction_update);
router.delete('/transaction/:id/delete', transaction_controller.transaction_delete);

module.exports = router;
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




// Path: views/index.ejs

