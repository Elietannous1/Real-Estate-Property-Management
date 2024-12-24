/*
  The UserRoute class defines routes for managing users in the system.
  Validators ensure that the provided data is valid for each request.
*/

const express = require('express');
const userController = require('../controllers/userController');
const { validateUser, validateUserId } = require('../validators/userDTO');
const router = express.Router();

// Route to get all users
// Calls the getAllUsers method in the userController.
router.get('/', (req, res) => userController.getAllUsers(req, res));

// Route to log a user out
// Calls the logout method in the userController.
router.post('/logout', (req, res) => userController.logout(req, res));

// Route to get a user by ID
// Calls the getUserById method in the userController, with validation for the user ID.
router.get('/:id', validateUserId, (req, res) => userController.getUserById(req, res));

// Route to update user credentials
// Calls the updateUser method in the userController, with validation for the data and ID.
//router.put('/:id', [validateUser, validateUserId], (req, res) => userController.updateUser(req, res));
router.post('/update/user/:id', [validateUser, validateUserId], (req, res) => userController.updateUser(req, res));


// Route to delete a user
// Calls the deleteUser method in the userController, with validation for the user ID.
//router.delete('/:id', validateUserId, (req, res) => userController.deleteUser(req, res));
router.get('/delete/user/:id', [validateUserId], (req, res) => userController.deleteUser(req, res));

router.get('/profile/:id', (req, res) => userController.userProfile(req, res))


module.exports = router;
