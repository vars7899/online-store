const router = require("express").Router();
const { category } = require("../controllers");
const { handleAuth, handleAdmin } = require("../middleware");

router.route("/").get(handleAuth, category.getAllCategories);
router.route("/add-new").post(handleAuth, handleAdmin, category.addNewCategory);
router.route("/:categoryId").get(handleAuth, handleAdmin, category.getAllCategoryProducts);

module.exports = router;
