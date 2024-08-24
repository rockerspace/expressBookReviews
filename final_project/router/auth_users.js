const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    const jwt = require('jsonwebtoken');

    customer_routes.post("/login", async (req, res) => {
      const { username, password } = req.body;
    
      // Check if username and password are provided
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
    
      // Find the user
      const user = users.find((user) => user.username === username);
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
    
      // Check if password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
    
      // Create a JWT token
      const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1h" });
    
      // Save the token in the session
      req.session.accessToken = token;
    
      res.json({ message: "Logged in successfully", token });
    });
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const jwt = require('jsonwebtoken');

    customer_routes.post("/login", async (req, res) => {
      const { username, password } = req.body;
    
      // Check if username and password are provided
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
    
      // Find the user
      const user = users.find((user) => user.username === username);
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
    
      // Check if password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
    
      // Create a JWT token
      const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1h" });
    
      // Save the token in the session
      req.session.accessToken = token;
    
      res.json({ message: "Logged in successfully", token });
    });
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    customer_routes.post("/review/:isbn", async (req, res) => {
        const isbn = req.params.isbn;
        const review = req.body.review;
        const username = req.session.username;
      
        if (!review) {
          return res.status(400).json({ error: "Review is required" });
        }
      
        const book = books.find((book) => book.isbn === isbn);
        if (!book) {
          return res.status(404).json({ error: "Book not found" });
        }
      
        const existingReview = book.reviews.find((review) => review.username === username);
        if (existingReview) {
          existingReview.review = review;
        } else {
          book.reviews.push({ username, review });
        }
      
        res.json({ message: "Review added/modified successfully" });
      });
  return res.status(300).json({message: "Yet to be implemented"});
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.username;
  
    const book = books.find((book) => book.isbn === isbn);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
  
    const reviewIndex = book.reviews.findIndex((review) => review.username === username);
    if (reviewIndex === -1) {
      return res.status(404).json({ error: "Review not found" });
    }
  
    book.reviews.splice(reviewIndex, 1);
  
    res.json({ message: "Review deleted successfully" });
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
