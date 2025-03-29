import User from "../models/user.model.js";

/**
 * Retrieves and returns a paginated list of all users.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the list of users or an error message.
 */
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = { page, limit };
    const users = await User.paginate({}, options);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * Retrieves and returns a single user by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the user or an error message.
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

/**
 * Creates and returns a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the created user or an error message.
 */
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

/**
 * Updates and returns a single user by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Responds with a JSON object containing the updated user or an error message.
 */
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(404).json({ message: "User not found." });
    } else if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
