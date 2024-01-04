const router = require("express").Router();
const { handleAdmin, handleAuth, handleMulter } = require("../middleware");
const { product, review } = require("../controllers");

router.route("/").get(handleAuth, product.getAllProducts);
router.route("/categorized").get(handleAuth, product.getALlProductsCategorized);
router.route("/add-new").post(handleAuth, handleAdmin, handleMulter, product.createNewProduct);

router
  .route("/:productId")
  .get(handleAuth, handleAdmin, product.getProductDetails)
  .delete(handleAuth, handleAdmin, product.removeProduct)
  .patch(handleAuth, handleAdmin, handleMulter, product.updateProductDetails);

router.route("/feature/:productId").patch(handleAuth, handleAdmin, product.updateProductFeatureVisibility);
// ! Product Review Routes
router
  .route("/review/:productId")
  .post(handleAuth, review.createNewProductReview)
  .delete(handleAuth, review.deleteUserReview);

module.exports = router;
