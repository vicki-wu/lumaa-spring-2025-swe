# **Task Manager**

## **Project Overview**

Task Manager is a full-stack task management application built with React and TypeScript for the frontend and Node.js with PostgreSQL for the backend. The application allows users to register, log in, create tasks, update tasks, and delete tasks.

## **Features**

- **User Authentication:** register and log in securely with JWT-based authentication
- **Task Management:** create, update, mark as complete, and delete tasks
- **Secure Backend:** protected API endpoints with JWT token validation
- **Database Integration:** PostgreSQL for data storage

## **Getting Started**

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **PostgreSQL** (v12 or higher)

### **Setup Instructions**

1. **Set Up the Database**:

- Run the following SQL commands to create the database and necessary tables

```
CREATE DATABASE task_management;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  "isComplete" BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

2. **Configure Environment Variables**

- Create a .env file in the root of your backend directory and replace the placeholders with your actual database credentials and a strong JWT secret key:

```
DB_USER=db_user
DB_PASSWORD=db_password
DB_HOST=localhost
DB_PORT=db_port
DB_NAME=db_name
JWT_SECRET=jwt_secret_key
```

3. **Run the backend**

- Run the following commands to install the dependencies and start the server:

```
cd server
npm install
npm start
```

4. **Run the frontend**

- Run the following commands to install the dependencies and start the client:

```
cd client
npm install
npm start
```

## **Salary Expectations**

$1,600 - $2,400 monthly ($20-$30/hr)
