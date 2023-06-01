//routes/index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
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
