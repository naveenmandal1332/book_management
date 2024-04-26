import jwt from 'jsonwebtoken';
import user from '../models/user.js';

const isLoggedIn = async (req, res, next) => {
  let statusCode = 400;
  try {
    const token =
      req?.cookie?.token ||
      (req.header('Authorization') && req.header('Authorization').replace('Bearer ', ''));

    if (!token) {
      statusCode = 401;
      throw new Error('Either Token is missing or expired!');
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await user.findById(decode.id);

    next();
  } catch (error) {
    console.error(error);
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export default isLoggedIn;
