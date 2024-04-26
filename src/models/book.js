import mongoose from 'mongoose';

const isValidYear = (value) => {
  const currentYear = new Date().getFullYear();
  return Number.isInteger(value) && value >= 1000 && value <= currentYear;
};

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide book title'],
    maxlength: [200, 'Title cannot be greater than 200 character'],
  },
  author: {
    type: String,
    required: [true, 'Please provide author name'],
    maxlength: [40, 'Author name should be less than 40'],
  },
  publisher: {
    type: String,
    required: [true, 'Please provide publisher name'],
    maxlength: [40, 'Publisher name should be less than 40'],
  },
  year: {
    type: Number,
    required: [true, 'Please provide publication year'],
    validate: {
      validator: isValidYear,
      message: 'Please provide a valid year less than or equal to the current year',
    },
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

const book = mongoose.model('Book', bookSchema);
export default book;
