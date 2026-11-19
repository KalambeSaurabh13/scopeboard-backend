
import {
  registerUser,
  loginUser
} from "../services/authService.js";

export const register = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: user
  });
};

export const login = async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result
  });
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated user",
    data: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
};