import User from '../models/user.js';
import cookieToken from '../utils/cookieToken.js';
import { encryptPassword, validPassword } from '../utils/passwordManagement.js';

// Signup:
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw new Error('Name, Email and password is mandatory!');

    const user = await User.create({ name, email, password });

    const newPassword = await encryptPassword(user.password);
    user.password = newPassword;

    await user.save();

    const cookieResponse = await cookieToken(user.id);
    if (cookieResponse.statusCode !== 200) throw new Error(cookieResponse.message);
    const { token, options } = cookieResponse.data;

    res.status(201).cookie('token', token, options).json({
      success: true,
      message: 'User created successfully!',
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// Signin:
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('email and password is mandatory!');

    // Get User from db:
    const user = await User.findOne({ email });
    if (!user) throw new Error('Wrong credential!');

    // Check Password:
    const isPasswordValid = await validPassword(password, user.password);
    if (!isPasswordValid) throw new Error('Wrong credential!');

    const cookieResponse = await cookieToken(user.id);
    if (cookieResponse.statusCode !== 200) throw new Error(cookieResponse.message);
    const { token, options } = cookieResponse.data;

    res.status(201).cookie('token', token, options).json({
      success: true,
      message: 'User login successfully!',
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// User logout:
const logout = async (req, res) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      http: true,
    });

    res.status(200).json({
      success: true,
      message: 'User Logout successfully!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { signup, signin, logout };
