async function sendToken(res, user, statusCode, message) {
  const token = await user.generateToken();
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expiry in 1 Day
  };
  // ! Delete user fields
  let { password, otp, ...userData } = user._doc;
  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message,
    user: userData,
  });
}

module.exports = sendToken;
