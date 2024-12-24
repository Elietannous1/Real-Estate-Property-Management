Real Estate Property Management System
This is a full-stack Real Estate Property Management System designed to help users manage properties, schedule appointments, handle transactions, and communicate with agents. Built with Node.js, this system includes JWT-based authentication, a messaging API, and extensive filtering capabilities.

Features
User Authentication: Secure authentication with JWT and refresh tokens.
Property Management: CRUD operations for properties, agents, and user data.
Appointments and Transactions: Appointment scheduling, details management, and transaction handling.
Favorites and Reviews: Users can mark properties as favorites and leave reviews.
Messaging System: Allows communication between users and agents.
Filtering: Powerful filtering for properties based on criteria like price, location, and features.
Technologies Used
Backend: Node.js, Express
Database: MySQL
Authentication: JWT for tokens, bcrypt for password hashing, express-validator for validation
Setup and Installation
Clone the repository:

Create a MySQL database and run the provided RealEstateDB.sql script to initialize tables.
Update the .env file with your database credentials.
Environment Variables: Set up the following variables in your .env file:

Copy code
# APP Configuration
PORT=3002

# Database Credentials
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=provide your db password
DB_PORT=3306
DB_NAME=provide your db name

# JWT Configuration
JWT_SECRET=provide a jwtsecret key for encrypting the jwt
REFRESH_SECRET=provide a jwtsecret key for encrypting the refresh token
JWT_EXPIRATION=1h
REFRESH_EXPIRATION=7d
Start the Server:

npm run dev
The application should now be running on the specified port.

API Routes
Below are some core routes of the Real Estate Property Management System:

Authentication (/auth)

POST /auth/login: Logs in a user and provides JWT and refresh tokens.
POST /auth/refresh: Provides a new access token using a refresh token.
User Management (/user)

GET /user/:id: Retrieves user profile by ID.
PUT /user/:id: Updates user details.
Property Management (/property)

GET /property: Retrieves a list of properties with filtering options.
POST /property: Adds a new property.
PUT /property/:id: Updates property details.
DELETE /property/:id: Deletes a property.
Agent Management (/agent)

GET /agent/:id: Retrieves agent details.
POST /agent: Creates a new agent profile.
Appointment Management (/appointment)

POST /appointment: Schedules a new appointment.
GET /appointment/:id: Retrieves appointment details.
Favorites (/favorites)

POST /favorites: Adds a property to the user's favorites.
DELETE /favorites/:id: Removes a property from favorites.
Messaging (/message)

POST /message: Sends a new message.
GET /message: Retrieves messages for the logged-in user.
Authentication
This project uses JWT for securing API endpoints. Only /auth routes are public; all others require a valid JWT access token.

Access Token: Expires in 1 hour (JWT_EXPIRATION=1h).
Refresh Token: Expires in 7 days (REFRESH_EXPIRATION=7d).
Password Hashing: Uses bcrypt to securely hash passwords.
Usage Examples
Login Request:

POST /auth/login
Request Body:

json
Copy code
{
  "email": "user@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "accessToken": "<JWT_ACCESS_TOKEN>",
  "refreshToken": "<JWT_REFRESH_TOKEN>"
}
Get Properties with Filters:

GET /property?location=NYC&price_min=100000&price_max=500000
Refresh Token:

POST /auth/refresh
Request Body:

json
Copy code
{
  "refreshToken": "<JWT_REFRESH_TOKEN>"
}

Future Enhancements
Enhanced filtering options (e.g., advanced search criteria for properties).
Additional messaging features, such as support for attachments or group messages.
User and agent role-based access control.

Dependencies
express: Web framework for Node.js
jsonwebtoken: For generating and verifying JWTs
bcrypt: For hashing passwords securely
mysql2: MySQL client for Node.js"# Real-Estate-Property-Management" 
