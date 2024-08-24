const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

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
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
