const router = require("express").Router();
const controller = require("../controllers");
const { handleAdmin, handleAuth } = require("../middleware");

router.route("/").post(controller.user.loginUser).get(handleAuth, controller.user.getUserDetails);
router.route("/register").post(controller.user.registerNewUser);
router.route("/check-login-status").get(handleAuth, controller.user.checkLoginStatus);
router.route("/verify").post(handleAuth, controller.user.verifyUser);
router.route("/logout").get(handleAuth, controller.user.logoutUser);
router.route("/forget-password").post(controller.user.sendForgotPasswordEmail);
router.route("/reset-password/:token").post(controller.user.resetPassword);
router.route("/update-password").patch(handleAuth, controller.user.updatePassword);
router.route("/update-details").patch(handleAuth, controller.user.updateUserDetails);
// ! User Shipping Address Routes
router
  .route("/shipping-address")
  .get(handleAuth, controller.user.getAllUserShippingAddress)
  .post(handleAuth, controller.user.addNewShippingAddress);
router
  .route("/shipping-address/update-shipping-address/:addressId")
  .patch(handleAuth, controller.user.updateShippingAddress)
  .delete(handleAuth, controller.user.deleteShippingAddress);
router
  .route("/shipping-address/update-default-shipping-address/:addressId")
  .patch(handleAuth, controller.user.updateDefaultShippingAddress);
// ! User Cart Routes
router.route("/cart/clear").get(handleAuth, controller.user.clearUserCart);
router.route("/cart").get(handleAuth, controller.user.getUserCartDetails);
router.route("/cart/:productId").patch(handleAuth, controller.user.addProductToUserCart);
router
  .route("/cart/update-cart/:cartItemId")
  .delete(handleAuth, controller.user.removeProductFromUserCart)
  .patch(handleAuth, controller.user.changeCartItemQty);
// ! User Wishlist Routes
router.route("/wishlist").get(handleAuth, controller.user.getUserWishlistDetails);
router
  .route("/wishlist/:productId")
  .patch(handleAuth, controller.user.addProductToUserWishlist)
  .delete(handleAuth, controller.user.removeProductFromUserWishlist);

module.exports = router;
