//routes/index.js
const express = require("express");
const router = express.Router();
const session = require('express-session');
// Require controller modules
const transaction_controller = require("../controllers/transactionController.js");
const user_controller = require("../controllers/userController.js");
//Routes for users
router.get("/",user_controller.home);
router.get("/register_sign",user_controller.register_sign);
router.get("/signin",user_controller.signin);
router.post("/signin",user_controller.signindone);
router.get("/register",user_controller.register);
router.post("/register",user_controller.user_create);
router.get("/logout",user_controller.logout);
// Routes for transactions
router.get("/:userId/transaction", transaction_controller.index);
router.post("/:userId/transaction/create", transaction_controller.transaction_create);
router.get("/:userId/transaction/:transactionId/edit", transaction_controller.transaction_edit);
router.post("/:userId/transaction/:transactionId/edit", transaction_controller.transaction_post_edit);
router.get("/:userId/transaction/:transactionId/delete", transaction_controller.transaction_delete);


module.exports = router;
