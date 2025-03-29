import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

/**
 * Retrieves and returns a paginated list of all orders.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the list of orders or an error message.
 */
export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const options = { page, limit };
    const orders = await Order.paginate({}, options);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves and returns a single order by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the order or an error message.
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(404).json({ message: "Order not found." });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

/**
 * Creates a new order with the given items and their quantities.
 * The product prices are assigned from the database based on their IDs, and those prices
 * are used to calculate the total amount of the order.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the created order or an error message.
 */
export const createOrder = async (req, res) => {
  try {
    const items = req.body.items;
    const itemsWithPrices = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error("Product not found.");
        }
        return {
          product: item.product,
          quantity: item.quantity,
          price: product.price, // Assign the price from the database
        };
      })
    );
    const total = itemsWithPrices.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    
    const order = await Order.create({
      ...req.body,
      items: itemsWithPrices,
      total,
    });
    res.status(201).json(order);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

/**
 * Updates and returns a single order by its ID.
 * The product prices are assigned from the database based on their IDs, and those prices
 * are used to calculate the total amount of the order.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the updated order or an error message.
 */
export const updateOrder = async (req, res) => {
  try {
    const items = req.body.items;
    const itemsWithPrices = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error("Product not found.");
        }
        return {
          product: item.product,
          quantity: item.quantity,
          price: product.price, // Assign the price from the database
        };
      })
    );
    const total = itemsWithPrices.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { ...req.body, items: itemsWithPrices, total },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(404).json({ message: "Order not found." });
    } else if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

/**
 * Deletes the order with the given ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the deleted order or an error message.
 */
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(404).json({ message: "Order not found." });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
