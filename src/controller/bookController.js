import Book from '../models/book.js';

// Add Book Details:
const addBooks = async (req, res) => {
  try {
    const { title, author, publisher, year, userId } = req.body;
    if (!title || !author || !publisher || !year || !userId)
      throw new Error('All Fields are mandatory!');

    const book = await Book.create(req.body);
    await book.save();

    res.status(201).json({
      success: true,
      message: 'Books added successfully!',
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Book Details:
const updateBook = async (req, res) => {
  let statusCode = 400;
  try {
    const id = req.params.id;
    if (!id) throw new Error('Please provide book id!');

    // Check book details:
    const book = await Book.findById(id);
    if (!book) {
      statusCode = 404;
      throw new Error('Book details not found!');
    }

    // update book details!:
    const updateBook = await Book.findByIdAndUpdate(id, req.body, { new: true });

    res.status(201).json({
      success: true,
      message: 'Books details updated successfully!',
      data: updateBook,
    });
  } catch (error) {
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Book Info:
const deleteBooks = async (req, res) => {
  let statusCode = 400;
  try {
    const id = req.params.id;
    if (!id) throw new Error('Please provide book id!');

    // Check book details:
    const book = await Book.findById(id);
    if (!book) {
      statusCode = 404;
      throw new Error('Book details not found!');
    }

    const deleteBooks = await Book.deleteOne();

    res.status(201).json({
      success: true,
      message: 'Books delete successfully!',
      data: deleteBooks,
    });
  } catch (error) {
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Book:
const fetchBooksByFilter = async (req, res) => {
  try {
    const { author, title, year, publisher, userId } = req.body;

    const filter = {};
    if (author) {
      filter.author = { $regex: new RegExp(author, 'i') };
    }
    if (title) {
      filter.title = { $regex: new RegExp(title, 'i') };
    }
    if (year) {
      filter.year = parseInt(year);
    }
    if (publisher) {
      filter.publisher = { $regex: new RegExp(publisher, 'i') };
    }
    if (userId) {
      filter.userId = { $regex: new RegExp(userId, 'i') };
    }

    // Fetch data based on the constructed filter
    const books = await Book.find(filter);

    res.status(201).json({
      success: true,
      message: `Successfully fetch books details!`,
      data: books,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { addBooks, updateBook, deleteBooks, fetchBooksByFilter };
