const createHttpError = require("http-errors");
const { Transaction } = require("../models");

const createNewTransactionRecord = async (req, res, next) => {
  try {
    console.log(req.body);
    const { amount, paymentId, comment } = req.body;
    if (!amount || !paymentId) {
      throw createHttpError(400, "Missing one or more required field(s), Please make sure you specified valid amount.");
    }

    await Transaction.create({
      amount,
      paymentId,
      user: req.user._id,
      createdAt: Date.now(),
    });

    res.status(200).json({
      success: true,
      message: "New Transaction was recorded",
      transactionHistoryList: await Transaction.find({ user: req.user._id }),
    });
  } catch (err) {
    next(err);
  }
};

const getAllUserTransactions = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "User transaction history",
      transactionHistoryList: await Transaction.find({ user: req.user._id }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewTransactionRecord,
  getAllUserTransactions,
};
