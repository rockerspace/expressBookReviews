const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


    public_users.post("/register", async (req, res) => {
        const { username, password } = req.body;
      
        // Check if username and password are provided
        if (!username || !password) {
          return res.status(400).json({ error: "Username and password are required" });
        }
      
        // Check if username already exists
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
          return res.status(400).json({ error: "Username already exists" });
        }
      
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
      
        // Create a new user
        const user = { username, password: hashedPassword };
      
        // Add the user to the array
        users.push(user);
      
        res.json({ message: "User registered successfully" });
      });
  return res.status(300).json({message: "Yet to be implemented"});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' },
  ];

  // Use JSON.stringify to display the output neatly
  res.json(JSON.stringify(books, null, 2));
});
  return res.status(300).json({message: "Yet to be implemented"});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1', isbn: '1234567890' },
    { id: 2, title: 'Book 2', author: 'Author 2', isbn: '2345678901' },
    { id: 3, title: 'Book 3', author: 'Author 3', isbn: '3456789012' },
  ];

  const book = books.find(book => book.isbn === isbn);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
  } else {
    res.json(book);
  }
});
  return res.status(300).json({message: "Yet to be implemented"});

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const books = [
      { id: 1, title: 'Book 1', author: 'Author 1', isbn: '1234567890' },
      { id: 2, title: 'Book 2', author: 'Author 2', isbn: '2345678901' },
      { id: 3, title: 'Book 3', author: 'Author 1', isbn: '3456789012' },
    ];
  
    const booksByAuthor = books.filter(book => book.author.toLowerCase() === author.toLowerCase());
  
    if (booksByAuthor.length === 0) {
      res.status(404).json({ error: 'No books found by this author' });
    } else {
      res.json(booksByAuthor);
    }
  });
  return res.status(300).json({message: "Yet to be implemented"});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const books = [
        { id: 1, title: 'Book 1', author: 'Author 1', isbn: '1234567890' },
        { id: 2, title: 'Book 2', author: 'Author 2', isbn: '2345678901' },
        { id: 3, title: 'Book 3', author: 'Author 1', isbn: '3456789012' },
      ];
    
      const bookByTitle = books.find(book => book.title.toLowerCase() === title.toLowerCase());
    
      if (!bookByTitle) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.json(bookByTitle);
      }
    });
  return res.status(300).json({message: "Yet to be implemented"});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const books = [
      {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
        isbn: '1234567890',
        reviews: [
          { rating: 4, review: 'Great book!' },
          { rating: 5, review: 'Loved it!' },
        ],
      },
      {
        id: 2,
        title: 'Book 2',
        author: 'Author 2',
        isbn: '2345678901',
        reviews: [
          { rating: 3, review: 'Good book.' },
          { rating: 4, review: 'Enjoyed it.' },
        ],
      },
    ];
  
    const book = books.find(book => book.isbn === isbn);
  
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else if (!book.reviews || book.reviews.length === 0) {
      res.json({ message: 'No reviews found for this book' });
    } else {
      res.json(book.reviews);
    }
  });
  return res.status(300).json({message: "Yet to be implemented"});

module.exports.general = public_users;

// Import Axios
const axios = require('axios');

// Function to get the list of books
async function getBooks() {
  try {
    // Make a GET request to the endpoint
    const response = await axios.get('http://localhost:5000/books');
    // Return the list of books
    return response.data;
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
}

// Call the function to get the list of books
getBooks().then((books) => {
  console.log(books);
  
});

// Import Axios
const axios = require('axios');

// Function to get book details by ISBN
async function getBookByISBN(isbn) {
  try {
    // Make a GET request to the endpoint
    const response = await axios.get(`http://localhost:5000/public/isbn/${isbn}`);
    // Return the book details
    return response.data;
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
}
// Call the function to get book details by ISBN
getBookByISBN('1234567890').then((book) => {
    console.log(book)
});
// Import Axios
const axios = require('axios');

// Function to get book details by Author
async function getBookByAuthor(author) {
  try {
    // Make a GET request to the endpoint
    const response = await axios.get(`http://localhost:5000/public/author/${author}`);
    // Return the book details
    return response.data;
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
}

// Call the function to get book details by Author
getBookByAuthor('Author 1').then((books) => {
  console.log(books);

});
// Import Axios
const axios = require('axios');

// Function to get book details by Title
async function getBookByTitle(title) {
  try {
    // Make a GET request to the endpoint
    const response = await axios.get(`http://localhost:5000/public/title/${title}`);
    // Return the book details
    return response.data;
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
}

// Call the function to get book details by Title
getBookByTitle('Book 1').then((book) => {
  console.log(book);
});