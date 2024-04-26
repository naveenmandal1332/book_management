import jwt from 'jsonwebtoken';

const cookieToken = async (id) => {
  try {
    const { SECRET_KEY, TOKEN_EXPIRY } = process.env;
    if (!SECRET_KEY || !TOKEN_EXPIRY) throw new Error('Secret key and token expiry is mandtory!');

    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });

    const options = {
      expires: new Date(Date.now() + TOKEN_EXPIRY),
      httpOnly: true,
    };

    return {
      statusCode: 200,
      data: {
        token,
        options,
      },
    };
  } catch (error) {
    return {
      statusCode: 400,
      message: error.message,
    };
  }

  // user.password = undefined;
  // res.status(201).cookie('token', options).json({
  //   success: true,
  //   token,
  //   user,
  // });
};
export default cookieToken;
