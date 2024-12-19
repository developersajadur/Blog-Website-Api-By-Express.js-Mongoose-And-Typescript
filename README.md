# Blog Management System - Backend

Welcome to the **Blog Management System**, a backend application built using **TypeScript**, **Express.js**, **Mongoose**, and **MongoDB**. This system provides a robust API for managing blogs, supporting features like user authentication, blog creation, updates, and retrieval with advanced query filtering.

## Features
- **Blog CRUD Operations**: Create, Read, Update, and Delete blogs.
- **User Authentication**: Secure login with JWT tokens.
- **Search and Filtering**: Advanced search and filter options for blogs.
- **Pagination and Sorting**: Efficient data handling with pagination and sorting.
- **Mongoose Integration**: Data models and schema validations using Mongoose.

## Technologies Used
- **Node.js**: JavaScript runtime.
- **Express.js**: Backend framework.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **TypeScript**: Type-safe development.

## Setup and Installation

### Prerequisites
- Node.js (v16 or later)
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/blog-management-system.git
   cd blog-management-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
   JWT_ACCESS_SECRET=yourAccessTokenSecret
   BCRYPT_SALT = chooce a number
   NODE_ENV = development
   ```

4. **Run the Application**
   ```bash
   npm run start:dev
   ```

5. **Access the API**
   The server will run on `http://localhost:5000`. Use Postman to test the endpoints.

   

## API Endpoints

### Blog Endpoints

#### Create Blog
```http
POST /api/blogs
```
- **Body**:
  ```json
  {
    "title": "string",
    "content": "string",
    "author": "userId"
  }
  ```

#### Get All Blogs
```http
GET /api/blogs
```
- **Query Parameters**:
  - `search`: Search blogs by title or content.
  - `sortBy`: Field to sort by (e.g., `createdAt`).
  - `sortOrder`: Sorting order (`asc` or `desc`).
  - `page`: Page number for pagination.
  - `limit`: Number of items per page.

#### Update Blog
```http
PUT /api/blogs/:id
```
- **Body**:
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```

#### Delete Blog
```http
DELETE /api/blogs/:id
```

### User Authentication Endpoints

#### Login
```http
POST /api/auth/login
```
- **Body**:
  ```json
  {
    "id": "string",
    "password": "string"
  }
  ```

## Folder Structure
```
├── src
│   ├── app
│   │   ├── modules
│   │   │   ├── blog
│   │   │   │   ├── blog.controller.ts
│   │   │   │   ├── blog.model.ts
│   │   │   │   ├── blog.service.ts
│   │   │   │   ├── blog.interface.ts
│   │   │   │   ├── blog.constant.ts
│   │   │   ├── user
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── user.service.ts
│   ├── config
│   ├── utils
│   ├── index.ts
├── .env
├── package.json
├── tsconfig.json
```

## Live URL
If deployed, provide the live URL here:
```
https://your-live-url.com
```

## Contribution
Feel free to fork the repository and contribute by submitting pull requests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---
Enjoy coding!

