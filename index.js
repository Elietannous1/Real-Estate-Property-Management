const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;  // Default to port 3000 if not specified in the environment
require('dotenv').config();  // Load environment variables from .env file
const ejs = require('ejs')
const propertyService = require('./services/propertyService')

app.use(express.json());  // Middleware to parse incoming JSON requests
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
// app.use(express.static('assets'));
app.use(express.static('public'));



// Import the authentication middleware to secure routes
const { authenticateToken } = require('./services/JWTService');

// Import route files for different functionality
const userRoute = require('./routes/userRoute');
const propertyRoute = require('./routes/propertyRoute');
const agentRoute = require('./routes/agentRoute');
const propertyDetailsRoute = require('./routes/propertyDetailsRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const favoritesRoute = require('./routes/favoritesRoute');
const appointmentDetailsRoute = require('./routes/appointmentDetailsRoute');
const messageRoute = require('./routes/messageRoute');
const messageRecipientsRoute = require('./routes/messageRecipientsRoute');
const paymentRoute = require('./routes/paymentRoute');
const reviewRoute = require('./routes/reviewsRoute');
const transactionRoute = require('./routes/transactionRoute');
const authRoute = require('./routes/authRoutes');

// Exclude the /auth route from the authentication middleware
app.use('/auth', authRoute);

app.get('/', async (req, res) => {
  res.render('login', {errorMessage: undefined})
})

app.get('/welcome', (req, res) => {
  const user = req.body;
  res.render('welcome', { user });
});

app.use('/signup', async (req, res) => {
  res.render('signup', {
    errorMessage: null, 
    name: '', 
    email: '', 
    location: '' 
  })
})
// Apply the authentication middleware to all routes except /auth
//app.use(authenticateToken);

// Define all protected routes, ensuring authentication is required
app.use('/user', userRoute);  // Route for user-related operations
app.use('/property', propertyRoute);  // Route for property-related operations
app.use('/agent', agentRoute);  // Route for agent-related operations
app.use('/propertyDetails', propertyDetailsRoute);  // Route for property details operations
app.use('/appointment', appointmentRoute);  // Route for appointment-related operations
app.use('/favorites', favoritesRoute);  // Route for managing favorites
app.use('/appointmentDetails', appointmentDetailsRoute);  // Route for appointment details
app.use('/message', messageRoute);  // Route for messaging system
app.use('/messageRecipients', messageRecipientsRoute);  // Route for message recipients
app.use('/payment', paymentRoute);  // Route for handling payments
app.use('/reviews', reviewRoute);  // Route for managing property reviews
app.use('/transaction', transactionRoute);  // Route for transaction-related operations


// Start the server on the specified port and log a message
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
