const OTP_LOWER_LIMIT = 100000;
const OTP_UPPER_LIMIT = 999999;

const generateOtp = () => {
  return Math.floor(Math.random() * (OTP_UPPER_LIMIT - OTP_LOWER_LIMIT)) + OTP_LOWER_LIMIT;
};

module.exports = generateOtp;
