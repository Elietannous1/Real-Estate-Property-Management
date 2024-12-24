// controllers/userController.js
/*
      -User controller class with the ability to :
        -get all available users,
        -get a user by id,
        -delete a user,
        -create a user,
        -update a user,
        -log a user in,
        -log a user out,
        -generate a new token for a certain user

    -->additional Classes used are the JWTService class that provides functions for assigning jwts and deleting them
    -->additional functions used are related to hashing the users password upon login or signup
*/

const userService = require('../services/userService');
const { hashPassword, checkPassword } = require('../helpers/authHelper')
const jwt = require('../services/JWTService');
const favoritesService = require('../services/favoritesService');
const propertyService = require('../services/propertyService');

class UserController {
    //fetches all user in the database
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  // fetches a specific user from the database based on his id
  async getUserById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await userService.getUserById(id);
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  // logs a user in and assigns a JWT token
  async logUserIn(req, res) {
    try {
      const { email, password } = req.body
      const user = await userService.checkUser(email)
      console.log(user)
      if(user && await checkPassword(password,user.hashedPassword)){
        const accessToken = await jwt.generateAccessToken(user)
        const refreshToken = await jwt.generateRefreshToken(user)
        // res.json({ message : 'Login successful',
        //   accessToken: accessToken,
        //   refreshToken: refreshToken
        //  })
        res.render('welcome', {user: user,
                               accessToken: accessToken,
                               refreshToken: refreshToken
                              })
      } else {
        res.render('login', {errorMessage: "Wrong email or password"})
        //return res.status(403).json({message : "Wrong email or password"})
      }
    } catch (error) {
      console.error("error : ", error)
      //res.status(500).json({ message : "Internal server error"})
      res.render('500')
    }
  }
  // Creates user (sign up) adds him to the database and assigns a token to him
  async createUser(req, res) {
    try {
      const { name, email, password, confirmPassword, location } = req.body;
    
      // Check if the user already exists
      const user = await userService.checkUser(email);
      if (user) {
        return res.render('signup', { 
          errorMessage: 'Email already exists!', 
          name, 
          email, 
          location 
        });
      }
    
      // Validate passwords
      if (password !== confirmPassword) {
        return res.render('signup', { 
          errorMessage: 'Passwords do not match!', 
          name, 
          email, 
          location 
        });
      }
    
      // Hash the password and create the user
      const hashedPass = await hashPassword(password);
      const newUser = await userService.createUser(name, email, hashedPass, location);
    
      // Generate tokens and redirect to success page
      const accessToken = await jwt.generateAccessToken(newUser);
      const refreshToken = await jwt.generateRefreshToken(newUser);
    
      return res.render('welcome', { 
        user: newUser, 
        accessToken, 
        refreshToken 
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.render('signup', { 
        errorMessage: 'Internal server error. Please try again later.', 
        name: req.body.name || '', 
        email: req.body.email || '', 
        location: req.body.location || '' 
      });
    }
    
    
  }
  // Update the current users credentials
  async updateUser(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { name, email, password, location } = req.body;
      const hashedPass = await hashPassword(password)
      const success = await userService.updateUser(id, name, email, hashedPass, location);
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  // Deletes user from the database
  async deleteUser(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await userService.deleteUser(id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  // Generates a new Token upon request from an existing refresh token
  async generateNewToken(req, res){
    try {
      const { refreshToken } = req.body;
        if (!refreshToken) {
          return res.status(400).json({ message: 'No refresh token provided' });
        }

      const result = await jwt.validateRefreshToken(refreshToken);
      console.log("result:", result);

        if (result.success) {
          const accessToken = await jwt.generateAccessToken(result.data);
          return res.json({ accessToken });
        } else {
          return res.status(403).json({ message: result.message });
        }
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  // logs user out and removes the token related to him
  async logout(req, res){
    try {
      const {id} = req.body
      const success = await jwt.removeUserRefreshToken(id)
      if(success){
        res.json({ message : 'logout successful'})
      } else {
        res.json({ message : 'Logout failed!'})
      }
    } catch (error) {
      console.log('Error: ', error)
      res.status(500).json({ message : 'Internal Server Error' })
    }
  }

  async userProfile(req, res) {
    try {
      const userId = req.params.id;
  
      // Fetch user details
      const user = await userService.getUserById(userId);
  
      // Fetch user's favorites
      let favorites = await favoritesService.getFavoritesByUserId(userId);
  
      // Ensure favorites is an array
      favorites = Array.isArray(favorites) ? favorites : [favorites];
  
      // Fetch property details for each favorite
      const favoriteDetails = await Promise.all(
        favorites.map(async (favorite) => {
          const property = await propertyService.getPropertyById(favorite.propertyId);
          return {
            favorite,
            property,
          };
        })
      );
  
      // Consolidate data into one big JSON object
      const data = {
        user,
        favorites: favoriteDetails, // Includes both favorite and property details
      };
  
      // Log to ensure the structure is correct
      console.log("Consolidated Data: ", JSON.stringify(data, null, 2));
  
      // Render EJS with the consolidated data
      res.render('userProfile', data);
    } catch (error) {
      console.log("error:", error);
      res.render('500');
    }
  }
  
}

// exports the userController class
module.exports = new UserController();
