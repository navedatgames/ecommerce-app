const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  getAllProductPagination,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/pagination").get(getAllProductPagination);
router.route("/:id").get(getSingleProduct);
router.route("/create").post(createProduct);

module.exports = router;
