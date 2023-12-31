const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      maxLength: 500,
    },
    transactionState: {
      type: String,
      enum: ["pending", "debit", "credit"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = Transaction;
