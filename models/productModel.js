const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      required: true,
    },
    company: {
      type: String,
      enum: {
        values: ["Apple", "Samsung", "Huawei", "Xiaomi", "Oppo"],
        message:
          "Company name must be one of the following: Apple, Samsung, Huawei, Xiaomi, Oppo",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
