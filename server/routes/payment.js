const router = require("express").Router();
const { handleAuth } = require("../middleware");
const { payment } = require("../controllers");

// Clients do not need to be authenticated in order to get the stripe public key for future integration to guest checkout form
router.route("/publicKey").get(payment.sendStripePublicKeyToClient);
// << TODO Can combine these two
router.route("/create-payment-intent").post(handleAuth, payment.generateStripeIntent);
router.route("/create-wallet-payment-intent").post(handleAuth, payment.generateStripeIntentForWallet);
router.route("/stripe/webhook").post(payment.stripePaymentWebhook);
module.exports = router;
