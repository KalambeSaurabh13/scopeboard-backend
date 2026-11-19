
import bcrypt from "bcrypt";

import {
  findUserByEmail,
  createUser
} from "../repositories/authRepository.js";
import { generateToken } from "../utils/jwtUtils.js";

const SALT_ROUNDS = 12;

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const registerUser = async ({ name, email, password }) => {
  // 1. Validate input
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw createError("Invalid registration details", 400);
  }

  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedName || !normalizedEmail || !password) {
    throw createError("All fields are required", 400);
  }

  if (normalizedName.length > 100 || normalizedEmail.length > 150) {
    throw createError("Name or email is too long", 400);
  }

  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    throw createError(
      "Password must be at least 8 characters and no more than 72 UTF-8 bytes",
      400
    );
  }

  // 2. Check whether email already exists
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw createError("Unable to register with these details", 409);
  }

  // 3. Hash password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // 4. Save user
  try {
    const user = await createUser({
      name: normalizedName,
      email: normalizedEmail,
      passwordHash
    });

    return user;
  } catch (error) {
    // Protect against two simultaneous registrations with the same email.
    if (error.code === "23505") {
      throw createError("Unable to register with these details", 409);
    }

    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    throw createError("Invalid email or password", 400);
  }

  const normalizedEmail = email.trim().toLowerCase();

  // 1. Find account
  const user = await findUserByEmail(normalizedEmail);

  // Use the same public error for missing and incorrect credentials.
  if (!user || !user.is_active) {
    throw createError("Invalid email or password", 401);
  }

  // 2. Compare entered password with stored hash
  const passwordMatches = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!passwordMatches) {
    throw createError("Invalid email or password", 401);
  }

  // 3. Return safe user details
 return {
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  },
  token: generateToken(user)
};
};
