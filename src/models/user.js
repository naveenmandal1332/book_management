import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [40, 'Name should be less than 40 character'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email'],
    validate: [validator.isEmail, 'Please enter email in correct format'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: [8, 'Password should be atleast 8 character'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model('User', userSchema);

export default user;
