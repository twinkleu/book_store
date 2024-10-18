# Bookstore API

A simplified bookstore API that allows users to browse books, add books to a cart, and place orders. The system supports user authentication and authorization.

## Features

- User registration and login
- Browse and search books
- Add books to a cart
- Place orders for books
- View order history

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd book_store

   ```

2. **Install the dependencies**:
   
    ```bash
   npm install
    ```

4. **Add dotenv file and below credentials in it**:
      
    ```bash
   PORT=6000
   MONGODB_URL=<your-mongodb-url>
   SECRET_KEY=<your-secret-key>
   JWT_EXPIRY_TIME=<jwt-expiry-time>
        ```

6. **Now run the project**:
       ```bash
   npm start
       ```
