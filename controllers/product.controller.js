import Product from "../models/product.model.js";

/**
 * Retrieves and returns a paginated list of all products.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the list of products or an error message.
 */
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const options = { page, limit };
    const products = await Product.paginate({}, options);
    
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves and returns a single product by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the product or an error message.
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(404).json({ message: "Product not found." });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

/**
 * Creates and returns a new product.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the created product or an error message.
 */
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

/**
 * Updates and returns a single product by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the updated product or an error message.
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(404).json({ message: "Product not found." });
    } else if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

/**
 * Deletes and returns a single product by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the deleted product or an error message.
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(404).json({ message: "Product not found." });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
