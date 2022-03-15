import pkg from 'bcryptjs';
const { compare, hash } = pkg;

export const hashPassword = async (password) => {
  const hased = await hash(password, 12);
  return hased;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
