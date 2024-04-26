import bcrypt from 'bcryptjs';

const encryptPassword = async (password) => {
  if (!password) throw new Error('Passowrd is empty!');
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

const validPassword = async (userSendPassword, passwordInDb) => {
  if (!userSendPassword) throw new Error('Passowrd is empty!');
  return await bcrypt.compare(userSendPassword, passwordInDb);
};
export { encryptPassword, validPassword };
