import express, { json } from "express";
import cors from "cors";

import "./config/db.js";

import orderRouter from "./routes/order.routes.js";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";

const whitelist = ["http://localhost:3000", "http://localhost:3001"];

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) { // Change to true to allow testing without CORS
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS."));
    }
  },
  credentials: true,
};

// Setup express
const app = express();
const port = 3001;

// Add middleware
app.use(cors(corsOptions));
app.use(json());

// Add routes
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

// Start server
app.listen(port, () => {
  console.log("App connected! Listening on port " + port + "!");
});
