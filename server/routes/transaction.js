const { createNewTransactionRecord, getAllUserTransactions } = require("../controllers/transaction");
const { handleAuth } = require("../middleware");

const router = require("express").Router();

router.route("/").get(handleAuth, getAllUserTransactions);
router.route("/new-transaction").post(handleAuth, createNewTransactionRecord);

module.exports = router;
