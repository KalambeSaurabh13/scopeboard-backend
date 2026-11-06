import pool from "../config/db.js";

// Get all employees
export const findAll = async () => {
  const result = await pool.query(
    "SELECT * FROM employees ORDER BY id"
  );

  return result.rows;
};

// Get employee by ID
export const findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM employees WHERE id = $1",
    [id]
  );

  return result.rows[0] || null;
};

// Create employee
export const create = async (employeeData) => {
  const { name, department, salary } = employeeData;

  const result = await pool.query(
    `INSERT INTO employees (name, department, salary)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, department, salary]
  );

  return result.rows[0];
};

// Update complete employee
export const update = async (id, employeeData) => {
  const { name, department, salary } = employeeData;

  const result = await pool.query(
    `UPDATE employees
     SET name = $1,
         department = $2,
         salary = $3
     WHERE id = $4
     RETURNING *`,
    [name, department, salary, id]
  );

  return result.rows[0] || null;
};

// Partially update employee
export const patch = async (id, employeeData) => {
  const allowedFields = ["name", "department", "salary"];

  const fields = Object.keys(employeeData);

  if (fields.length === 0 || fields.some(field => !allowedFields.includes(field))) {
    throw new Error("Invalid or empty employee update fields");
  }

  const values = [];
  const setClauses = [];

  fields.forEach((field, index) => {
    setClauses.push(`${field} = $${index + 1}`);
    values.push(employeeData[field]);
  });

  values.push(id);

  const result = await pool.query(
    `UPDATE employees
     SET ${setClauses.join(", ")}
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );

  return result.rows[0] || null;
};

// Delete employee
export const remove = async (id) => {
  const result = await pool.query(
    "DELETE FROM employees WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0] || null;
};