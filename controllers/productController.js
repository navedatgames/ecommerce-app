const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  //req.query for filter data search
  const { company, name, sort, select } = req.query;
  const query = {};
  if (company) {
    query.company = company;
  }
  // advance search to overcome case sensitive
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(query);

  //sorting asc or desc
  if (sort) {
    let sortFix = sort.replace(",", " ");
    apiData = apiData.sort(sortFix);
  }

  //select only some field
  if (select) {
    let selectedField = select.replace(",", " ");
    apiData = apiData.select(selectedField);
  }

  // sort by price default asc if - then des
  const products = await apiData;
  res.status(200).json({ data: products });
};

const getAllProductPagination = async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 2;
  let skip = (page - 1) * limit;

  const product = await Product.find().skip(skip).limit(limit);
  res.status(200).json({ data: product, length: product.length });
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ data: product });
  } catch (err) {
    res.status(404).json({ message: "product not found" });
  }
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({ message: "product created", data: product });
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  getAllProductPagination,
};
