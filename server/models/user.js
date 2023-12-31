const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Required field"],
    maxLength: [20, "Max character limit of 20 character"],
  },
  lastName: {
    type: String,
    required: [true, "Required field"],
    maxLength: [20, "Max character limit of 20 character"],
  },
  email: {
    type: String,
    required: [true, "Required field"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email provided is invalid",
    ],
    unique: [true, "Email is a unique field"],
    trim: true,
    maxLength: [100, "Email has maximum character limit of 100"],
  },
  password: {
    type: String,
    required: [true, "Required field"],
    minLength: [8, "Min character limit of 8 character"],
  },
  role: {
    type: String,
    required: [true, "Role is a required field"],
    default: "customer",
    enum: ["customer", "admin"],
  },
  phone: {
    type: String,
    default: "",
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
  defaultShippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
  shippingAddress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
    },
  ],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      qty: { type: Number, default: 0, required: [true, "Wishlist product quantity is a required field"] },
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  wallet: {
    balance: {
      type: Number,
      default: 0,
    },
    // default: "0.00",
  },
  otp: {
    value: String,
    expiresAt: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// Pre functions
UserSchema.pre("save", async function hashPassword(next) {
  let password = this.password;
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(password, SALT_ROUNDS);
  next();
});

// Generate Token
UserSchema.methods.generateToken = function () {
  // Creates a token that expires in 1 day
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Match password
UserSchema.methods.matchPassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

// Delete expired unverified accounts
UserSchema.index({ "otp.expiresAt": 1 }, { expireAfterSeconds: 0 });

const User = mongoose.model("user", UserSchema);
module.exports = User;
