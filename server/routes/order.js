const { handleAuth, handleAdmin } = require("../middleware");
const router = require("express").Router();
const { order } = require("../controllers");

router.route("/charges-info").get(handleAuth, order.getOrderChargesInformation);
router.route("/charges").post(handleAuth, order.getOrderCharges);
router.route("/").get(handleAuth, order.getAllUserOrders).post(handleAuth, order.createNewOrder);
router.route("/update-payment/:orderId").post(handleAuth, order.updateOrderPaymentDetails);

router.route("/with-product/:productId").get(handleAuth, handleAdmin, order.getAllOrdersWithGivenProduct);

module.exports = router;
