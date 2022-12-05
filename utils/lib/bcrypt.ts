import { compare, hash } from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const hased = await hash(password, 12);
  return hased;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
