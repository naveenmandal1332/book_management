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
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Book Info:
const deleteBooks = async (req, res) => {};

// Get Book:

export { addBooks, updateBook };
