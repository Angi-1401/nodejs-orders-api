# Node.js Orders API

This is a RESTful API built with Node.js, Express, and MongoDB for managing orders, products, and users. It supports CRUD operations for each resource and includes pagination for listing data.

## Features

- **Orders**: Create, read, update, and delete orders. Automatically calculates the total price based on product prices and quantities.
- **Products**: Manage product inventory with validation for names, descriptions, prices, and stock.
- **Users**: Manage user accounts with validation for names, emails, and passwords.
- **Pagination**: Built-in pagination for listing orders, products, and users.
- **CORS**: Configurable Cross-Origin Resource Sharing (CORS) support.
- **Environment Variables**: Configuration via `.env` file.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Angi-1401/nodejs-orders-api.git
cd nodejs-orders-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file by copying .env.sample.

4. Update the .env file with your database configuration.

## Usage

Run the Development Server
```bash
npm run dev
```
The server will run on http://localhost:3001

## API Endpoints

### Orders

- GET /orders: Get all orders (paginated).
- GET /orders/:id: Get a specific order by ID.
- POST /orders: Create a new order.
- PATCH /orders/:id: Update an order by ID.
- DELETE /orders/:id: Delete an order by ID.

### Products

- GET /products: Get all products (paginated).
- GET /products/:id: Get a specific product by ID.
- POST /products: Create a new product.
- PATCH /products/:id: Update a product by ID.
- DELETE /products/:id: Delete a product by ID.

### Users

- GET /users: Get all users (paginated).
- GET /users/:id: Get a specific user by ID.
- POST /users: Create a new user.
- PATCH /users/:id: Update a user by ID.
- DELETE /users/:id: Delete a user by ID.

## Dependencies

- [Express](https://expressjs.com/) - Web framework for Node.js.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool.
- [Mongoose Paginate v2](https://www.npmjs.com/package/mongoose-paginate-v2) - Pagination plugin for Mongoose.
- [Dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from .env.
- [CORS](https://www.npmjs.com/package/cors) - Middleware for enabling CORS.