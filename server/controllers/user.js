const createHttpError = require("http-errors");
const functions = require("../functions");
const User = require("../models").User;
const Address = require("../models").Address;
const Token = require("../models").Token;
const crypto = require("crypto");
const mongoose = require("mongoose");
const checkForValidObjectId = require("../functions/checkForValidObjectId");
const Review = require("../models/review");
const Product = require("../models/product");

const registerNewUser = async (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    // ! Check for required fields
    if (!firstName || !lastName || !email || !password) {
      throw createHttpError(400, "Missing one or more required field(s), Please try again");
    }
    if (password.length < 8) {
      throw createHttpError(400, "Password must have minimum 8 character");
    }
    // const { street, city, state, country, postalCode } = address;
    // if (!street || !city || !state || !country || !postalCode) {
    //   throw createHttpError(400, "Missing one or more required address field(s), please try again");
    // }
    if (!functions.validateEmail(email)) {
      throw createHttpError(400, "Invalid email syntax, please try again");
    }
    // ! Check email
    const emailAlreadyExist = await User.findOne({ email });
    if (emailAlreadyExist) {
      throw createHttpError(400, "Email is already registered, please login instead");
    }
    // ! Create
    const otpValue = functions.generateOtp();
    // const linkedAddress = await Address.create(address);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      // billingAddress: linkedAddress,
      otp: {
        value: otpValue,
        expiresAt: new Date(Date.now() + process.env.OTP_EXPIRATION_GAP * 60 * 1000),
      },
    });

    // ! Send OTP to the user email
    functions.sendEmail(
      email,
      "Verify your Eccent* account",
      `<div>
          <p>${otpValue}</p>
      </div>`
    );

    // ! response
    functions.sendToken(
      res,
      newUser,
      201,
      "User registered successfully, An OTP was sent to the provided email, please verify to continue"
    );
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // ! check for required fields
    if (!email || !password) {
      throw createHttpError(400, "Missing one or more required fields");
    }

    // ! find the user from email and check password
    const userExist = await User.findOne({ email });

    if (!userExist || !(await userExist.matchPassword(password))) {
      throw createHttpError(400, "Invalid Email or Password");
    }

    functions.sendToken(res, userExist, 200, "User logged In successfully");
  } catch (error) {
    next(error);
  }
};

const checkLoginStatus = async (req, res, next) => {
  try {
    functions.sendToken(res, req.user, 200, "User is logged In");
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const userExist = await User.findById(req.user._id);
    console.log(Number(userExist.otp.value) === Number(otp));

    // check for otp and otp expiry
    if (Number(userExist.otp.value) !== Number(otp) || userExist.otp.expiresAt < Date.now()) {
      throw createHttpError(400, "Invalid or expired OTP");
    }

    // update user if found
    userExist.otp.value = null;
    userExist.otp.expiresAt = null;
    userExist.isVerified = true;
    await userExist.save();

    // send response
    functions.sendToken(res, userExist, 200, "User verified successfully");
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (_, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User logged Out successfully",
      });
  } catch (error) {
    next(error);
  }
};

const getUserDetails = async (req, res) => {
  const user = await User.findById(req.user._id);
  functions.sendToken(res, user, 200, "User details fetched successfully");
};

const sendForgotPasswordEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    // look for required fields
    if (!email) {
      throw createHttpError(400, "Email is required field");
    }

    const userExist = await User.findOne({ email });

    // create and hash token to store in the db
    const resetToken = crypto.randomBytes(32).toString("hex") + userExist._id;
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // first delete the token for user if already exist
    const tokenExist = await Token.findOne({ user: userExist._id });
    if (tokenExist) {
      await tokenExist.deleteOne();
    }
    // Create new Token for reset link
    const token = await Token.create({
      user: userExist._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * 60 * 1000,
    });

    if (userExist && token) {
      functions.sendEmail(
        email,
        "Reset your Eccent* account password",
        `<div>
            <p>http://localhost:5173/reset-password/${resetToken}</p>
        </div>`
      );
    }
    if (token) {
      res.status(200).json({
        success: true,
        message: "Link to reset password will be sent to the provided email",
      });
    }
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { newPassword, newCfPassword } = req.body;
  const { token } = req.params;

  try {
    // check for required fields
    if (!newPassword || !newCfPassword) {
      throw createHttpError(400, "Missing one or more required field(s)");
    }
    // check password match
    if (newPassword !== newCfPassword) {
      throw createHttpError(400, "Given password does not match, please try again");
    }

    // unhashed token and compare
    const unHashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // find token in the db
    const userToken = await Token.findOne({
      token: unHashedToken,
      expiresAt: { $gt: Date.now() },
    });
    if (!userToken) {
      res.status(404);
      throw new Error("Invalid or expired Token");
    }

    // find user and update user password
    const userExist = await User.findById(userToken.user);
    userExist.password = newPassword;
    await userExist.save();

    functions.sendToken(res, userExist, 200, "Password reset successfully, please Sign in with new credentials");
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword, newCfPassword } = req.body;

  try {
    if (!oldPassword || !newPassword || !newCfPassword) {
      throw createHttpError(400, "Missing one or more required field(s)");
    }
    if (newCfPassword !== newPassword) {
      throw createHttpError(400, "New password does not match");
    }

    const userExist = await User.findById(req.user._id);

    if (!userExist.matchPassword(oldPassword)) {
      throw createHttpError(400, "Provided password does not match our records, please try again or forget password");
    }

    userExist.password = newPassword;
    await userExist.save();

    functions.sendToken(res, userExist, 200, "User password updated successfully");
  } catch (error) {
    next(error);
  }
};

const updateUserDetails = async (req, res, next) => {
  const { firstName, lastName, street, addressLine, city, state, country, postalCode, phone } = req.body;

  try {
    let updatedUser = await User.findByIdAndUpdate(req.user._id, { firstName, lastName, phone }, { new: true });

    if (street || addressLine || city || state || country || postalCode) {
      // update address
      await Address.findByIdAndUpdate(
        updatedUser.address,
        { street, city, state, country, postalCode, addressLine },
        { new: true }
      );
    }

    const userDetails = await User.findById(updatedUser._id);

    if (updatedUser) {
      functions.sendToken(res, userDetails, 200, "User Details updated successfully");
    }
  } catch (error) {
    next(error);
  }
};

const getAllUserShippingAddress = async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.user).populate("shippingAddress defaultShippingAddress");

    res.status(200).json({
      success: true,
      message: "List of shipping address",
      shippingAddress: existingUser.shippingAddress,
      defaultShippingAddress: existingUser.defaultShippingAddress,
    });
  } catch (err) {
    next(err);
  }
};

const addNewShippingAddress = async (req, res, next) => {
  const { street, city, state, country, postalCode } = req.body;
  try {
    if (!street || !city || !state || !country || !postalCode) {
      throw createHttpError(400, "Missing one or more required field(s)");
    }
    const newAddress = await Address.create(req.body);
    // Link address
    let userExist = await User.findById(req.user._id);
    if (!userExist.defaultShippingAddress) {
      userExist.defaultShippingAddress = newAddress;
    }
    userExist.shippingAddress.push(newAddress._id);
    await userExist.save();

    userExist = await User.findById(req.user)
      .select("shippingAddress defaultShippingAddress")
      .populate("shippingAddress defaultShippingAddress");

    res.status(200).json({
      success: true,
      message: "Address added to the profile",
      shippingAddress: userExist.shippingAddress,
      defaultShippingAddress: userExist.defaultShippingAddress,
    });
  } catch (error) {
    next(error);
  }
};

const updateShippingAddress = async (req, res, next) => {
  try {
    const { street, addressLine, city, state, country, postalCode, name, contactInformation, deliveryInstruction } =
      req.body;
    const { addressId } = req.params;
    // check for required fields
    if (!addressId || !mongoose.isValidObjectId(addressId)) {
      throw createHttpError(400, "Missing or Invalid address ID. Please try again");
    }
    // check if the user has the right to update address
    if (!(await User.findOne({ _id: req.user._id, shippingAddress: { $in: [addressId] } }))) {
      throw createHttpError(401, "User is not Authorized to perform this action");
    }
    // update address
    const addressExist = await Address.findById(addressId);
    addressExist.street = street ? street : addressExist.street;
    addressExist.addressLine = addressLine ? addressLine : addressExist.addressLine;
    addressExist.city = city ? city : addressExist.city;
    addressExist.state = state ? state : addressExist.state;
    addressExist.country = country ? country : addressExist.country;
    addressExist.postalCode = postalCode ? postalCode : addressExist.postalCode;
    addressExist.name = name ? name : addressExist.name;
    addressExist.contactInformation = contactInformation ? contactInformation : addressExist.contactInformation;
    addressExist.deliveryInstruction = deliveryInstruction ? deliveryInstruction : addressExist.deliveryInstruction;
    await addressExist.save();

    const updatedUser = await User.findById(req.user)
      .select("shippingAddress defaultShippingAddress")
      .populate("shippingAddress defaultShippingAddress");

    res.status(200).json({
      success: true,
      message: "User address updated successfully",
      shippingAddress: updatedUser.shippingAddress,
      defaultShippingAddress: updatedUser.defaultShippingAddress,
    });
  } catch (error) {
    next(error);
  }
};

const deleteShippingAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    // check for required fields
    if (!addressId || !mongoose.isValidObjectId(addressId)) {
      throw createHttpError(404, "Missing or Invalid address ID. Please try again");
    }
    // update password
    await Address.findByIdAndDelete(addressId);
    let updatedUser = await User.findById(req.user._id).select("-password -otp").populate();

    updatedUser.shippingAddress = updatedUser.shippingAddress.filter((a) => a.toString() !== addressId.toString());

    if (updatedUser.defaultShippingAddress.toString() === addressId.toString()) {
      updatedUser.defaultShippingAddress = null;
    }
    await updatedUser.save();
    updatedUser = await User.findById(req.user)
      .select("shippingAddress defaultShippingAddress")
      .populate("shippingAddress defaultShippingAddress");

    res.status(200).json({
      success: true,
      message: "Shipping address deleted successfully",
      shippingAddress: updatedUser.shippingAddress,
      defaultShippingAddress: updatedUser.defaultShippingAddress,
    });
  } catch (error) {
    next(error);
  }
};

const updateDefaultShippingAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    if (!addressId || !mongoose.isValidObjectId(addressId)) {
      throw createHttpError(404, "Missing or Invalid address ID. Please try again");
    }
    let userExist = await User.findByIdAndUpdate(
      req.user._id,
      {
        defaultShippingAddress: addressId,
      },
      { new: true }
    );
    userExist = await User.findById(req.user)
      .select("shippingAddress defaultShippingAddress")
      .populate("shippingAddress defaultShippingAddress");

    res.status(200).json({
      success: true,
      message: "User address updated successfully",
      shippingAddress: userExist.shippingAddress,
      defaultShippingAddress: userExist.defaultShippingAddress,
    });
  } catch (error) {
    next(error);
  }
};

const getUserCartDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).populate({ path: "cart.product" });

    res.status(200).json({
      success: true,
      message: "User cart details",
      cart: user.cart,
    });
  } catch (err) {
    next(err);
  }
};

const clearUserCart = async (req, res, next) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.user,
      {
        $set: { cart: [] },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User profile updated, cart was cleared",
      cart: result.cart,
    });
  } catch (err) {
    next(err);
  }
};

const addProductToUserCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { qty } = req.body;

    checkForValidObjectId(productId, "product");

    let user = await User.findById(req.user._id);
    // Check if the product is already present in the user cart
    if (user.cart.find((cartList) => cartList.product.toString() === productId.toString())) {
      let existingProduct = user.cart.find((cartList) => cartList.product.toString() === productId.toString());
      existingProduct.qty = Number(existingProduct.qty) + Number(qty ? qty : 1);
      user.cart = user.cart.filter((cartList) => cartList.product.toString() !== productId.toString());
      user.cart.push(existingProduct);
    } else {
      user.cart.push({
        product: productId,
        qty: qty ? qty : 1,
      });
    }
    await user.save();
    user = await user.populate("cart.product");

    res.status(200).json({
      success: true,
      message: "Product added to user cart",
      cart: user.cart,
    });
  } catch (err) {
    next(err);
  }
};

const changeCartItemQty = async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const { changeValue } = req.body;

    checkForValidObjectId(cartItemId, "Cart item");

    const existingUser = await User.findOneAndUpdate(
      {
        _id: req.user,
        "cart._id": cartItemId,
      },
      {
        $inc: { "cart.$.qty": changeValue },
      },
      { new: true }
    ).populate("cart.product");

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart: existingUser.cart,
    });
  } catch (error) {
    next(error);
  }
};

const removeProductFromUserCart = async (req, res, next) => {
  try {
    const { cartItemId } = req.params;

    checkForValidObjectId(cartItemId, "Cart item");

    let user = await User.findById(req.user._id);
    // Check and remove the product from the user cart
    user.cart = user.cart.filter((cartList) => cartList._id.toString() !== cartItemId.toString());
    await user.save();
    user = await user.populate("cart.product");

    res.status(200).json({
      success: true,
      message: "Product removed from user cart",
      cart: user.cart,
    });
  } catch (err) {
    next(err);
  }
};

const addProductToUserWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    checkForValidObjectId(productId, "product");

    const user = await User.findById(req.user._id);
    // Check if the product is already present in the user wishlist
    if (user.wishlist.find((existingProductId) => existingProductId.toString() === productId.toString())) {
      throw createHttpError(400, "Product already exist in user wishlist");
    }
    user.wishlist.push(productId);
    await user.save();
    await user.populate("wishlist");

    res.status(200).json({
      success: true,
      message: "Product added to user wishlist",
      wishlist: user.wishlist,
    });
  } catch (err) {
    next(err);
  }
};

const removeProductFromUserWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    checkForValidObjectId(productId, "product");

    const user = await User.findById(req.user._id);
    // Check and remove the product from the user wishlist
    user.wishlist = user.wishlist.filter((existingProductId) => existingProductId.toString() !== productId.toString());
    await user.save();
    await user.populate("wishlist");

    res.status(200).json({
      success: true,
      message: "Product removed from user wishlist",
      wishlist: user.wishlist,
    });
  } catch (err) {
    next(err);
  }
};

const getUserWishlistDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).populate({ path: "wishlist" });

    res.status(200).json({
      success: true,
      message: "User cart details",
      wishlist: user.wishlist,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerNewUser,
  loginUser,
  checkLoginStatus,
  verifyUser,
  logoutUser,
  getUserDetails,
  sendForgotPasswordEmail,
  resetPassword,
  updatePassword,
  updateUserDetails,
  addNewShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  updateDefaultShippingAddress,
  getUserCartDetails,
  addProductToUserCart,
  removeProductFromUserCart,
  getUserWishlistDetails,
  addProductToUserWishlist,
  removeProductFromUserWishlist,
  getAllUserShippingAddress,
  changeCartItemQty,
  clearUserCart,
};
