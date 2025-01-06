import jwt from 'jsonwebtoken'


// Type definition for JWT secret
const JWT_SECRET: string = process.env.JWT_SECRET || "";

// Function to generate a token
const generateToken = (userId: string): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  return jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

export default generateToken;
