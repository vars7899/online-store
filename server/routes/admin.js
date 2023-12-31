const router = require("express").Router();
const { handleAuth, handleAdmin } = require("../middleware");
const { order, admin } = require("../controllers");

router.route("/order").get(handleAuth, handleAdmin, order.getAllStoreOrders);
router.route("/order/stats").get(handleAuth, handleAdmin, admin.getUserOrderPreferences);
router.route("/order/:orderId").get(handleAuth, handleAdmin, order.getCompleteOrderDetails);
router.route("/order/status/:orderId").put(handleAuth, handleAdmin, order.updateOrderState);

// Admin User Routes
router.route("/users").get(handleAuth, handleAdmin, admin.getAllUserDetails);

module.exports = router;
