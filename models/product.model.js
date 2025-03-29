import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[A-Za-záéíóúÁÉÍÓÚñÑ\s-]+$/.test(value);
        },
        message: "Name should only contain letters, spaces and dashes.",
      },
    },
    description: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
        },
        message: "Description should only contain letters and spaces.",
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Add pagination
productSchema.plugin(mongoosePaginate);

// Define the Product model
const Product = mongoose.model("Product", productSchema);

export default Product;
