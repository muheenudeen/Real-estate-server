import bcrypt from 'bcrypt'

// Function to hash a password
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// Function to compare passwords
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Export the bcrypt-related functions as a utility object
export const bcryptData = {
  hashPassword,
  comparePassword,
};

