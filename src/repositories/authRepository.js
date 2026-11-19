
import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const query = `
    SELECT id, name, email, password_hash, role, is_active
    FROM users
    WHERE email = $1
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0] || null;
};

export const createUser = async (userData) => {
  const query = `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, role, is_active, created_at
  `;

  const result = await pool.query(query, [
    userData.name,
    userData.email,
    userData.passwordHash
  ]);

  return result.rows[0];
};
    