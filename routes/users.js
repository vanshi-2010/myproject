const express = require('express');
const router = express.Router();

let books = [
    {
        "isbn": "978-3-16-148410-0",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "reviews": [
            {
                "userId": "1",
                "text": "A classic piece of American fiction."
            },
            {
                "userId": "2",
                "text": "An excellent portrayal of the Jazz Age."
            }
        ]
    },
    {
        "isbn": "978-1-56619-909-4",
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "reviews": [
            {
                "userId": "1",
                "text": "A profound impact on social justice."
            },
            {
                "userId": "3",
                "text": "Timeless and moving."
            }
        ]
    },
    {
        "isbn": "978-0-7432-7356-5",
        "title": "1984",
        "author": "George Orwell",
        "reviews": [
            {
                "userId": "2",
                "text": "A chilling depiction of totalitarianism."
            }
        ]
    },
    {
        "isbn": "978-0-452-28423-4",
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "reviews": [
            {
                "userId": "1",
                "text": "A delightful exploration of social class and romance."
            }
        ]
    },
    {
        "isbn": "978-0-670-81302-8",
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "reviews": [
            {
                "userId": "3",
                "text": "A masterpiece of adolescent angst and alienation."
            }
        ]
    }
];

// GET request: Retrieve all books
router.get("/", (req, res) => {
    res.json(books);
});

// GET by ISBN request: Retrieve a single book by ISBN
router.get("/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let foundBooks = books.filter((book) => book.isbn === isbn);
    res.json(foundBooks);
});

// GET request: Retrieve all books by author
router.get("/author/:author", (req, res) => {
    const author = req.params.author;
    let filtered_books = books.filter((book) => book.author === author);
    res.send(filtered_books);
  });

  // GET request: Retrieve all books by title
router.get("/title/:title", (req, res) => {
    const title = req.params.title;
    let filtered_books = books.filter((book) => book.title === title);
    res.send(filtered_books);
  });

// GET request: Get book review
router.get("/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find((book) => book.isbn === isbn);
    if (book) {
      res.send(book.reviews);
    } else {
      res.status(404).send("Book not found");
    }
  });

// POST request: Register new user
router.post("/register", (req, res) => {
    const { firstName, lastName, email, dob } = req.body;
    // Assume user registration logic here
    // For demonstration, just adding to the users array
    users.push({ firstName, lastName, email, dob });
    res.send("User registered successfully");
  });

// POST request: Login as registered user
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    // Assume user authentication logic here
    // For demonstration, checking against users array
    const user = user.find((user) => user.email === email && user.password === password);
    if (user) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
  
// POST request: Add a new review for a book (assuming logged in users)
router.post("/:isbn/reviews", (req, res) => {
    const isbn = req.params.isbn;
    const { user, rating, comment } = req.body;
    const newReview = { user, rating, comment };

    let book = books.find((book) => book.isbn === isbn);
    if (book) {
        book.reviews.push(newReview);
        res.send(`Review added for book with ISBN ${isbn}`);
    } else {
        res.status(404).send(`Book with ISBN ${isbn} not found`);
    }
});

// PUT request: Modify a book review (assuming logged in users can modify their own reviews)
router.put("/:isbn/reviews/:reviewId", (req, res) => {
    const isbn = req.params.isbn;
    const reviewId = req.params.reviewId;
    const { rating, comment } = req.body;

    let book = books.find((book) => book.isbn === isbn);
    if (book) {
        let review = book.reviews.find((review) => review._id === reviewId);
        if (review) {
            review.rating = rating || review.rating;
            review.comment = comment || review.comment;
            res.send(`Review updated for book with ISBN ${isbn}`);
        } else {
            res.status(404).send(`Review with ID ${reviewId} not found for book with ISBN ${isbn}`);
        }
    } else {
        res.status(404).send(`Book with ISBN ${isbn} not found`);
    }
});

// DELETE request: Delete a book review (assuming logged in users can delete their own reviews)
router.delete("/:isbn/reviews/:reviewId", (req, res) => {
    const isbn = req.params.isbn;
    const reviewId = req.params.reviewId;

    let book = books.find((book) => book.isbn === isbn);
    if (book) {
        const initialLength = book.reviews.length;
        book.reviews = book.reviews.filter((review) => review._id !== reviewId);
        if (book.reviews.length < initialLength) {
            res.send(`Review with ID ${reviewId} deleted for book with ISBN ${isbn}`);
        } else {
            res.status(404).send(`Review with ID ${reviewId} not found for book with ISBN ${isbn}`);
        }
    } else {
        res.status(404).send(`Book with ISBN ${isbn} not found`);
    }
});

module.exports = router;
