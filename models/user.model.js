import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
        },
        message: "Name should only contain letters and spaces.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: "Invalid email format.",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(
            value
          );
        },
        message:
          "Password must be 8-32 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add pagination
userSchema.plugin(mongoosePaginate);

// Define the user model
const User = mongoose.model("User", userSchema);

export default User;
