import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { SECRET_KEY, TOKEN_EXPIRY } = process.env;

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

// Encrypt Password before save:
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Validate the user password:
userSchema.methods.isValidatePassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

// Create and return jwt token:
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
};

export default user;
