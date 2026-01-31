import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const getPasswordHash = async (
  plainPassword: string,
): Promise<string> => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

export const comparePassword = async (plain: string,hash: string,
): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};