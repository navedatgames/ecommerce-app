const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  res.status(200).json({ message: "Get all products" });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({ message: "product created", data: product });
};

module.exports = {
  getAllProducts,
  createProduct,
};
