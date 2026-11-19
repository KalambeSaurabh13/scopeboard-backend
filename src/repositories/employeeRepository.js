import pool from "../config/db.js";

// Get all employees
export const findAll = async () => {
     const result = await pool.query(`
        SELECT
            e.id,
            e.name,
            e.department_id,
            d.name AS department,
            e.salary,
            e.created_at
        FROM employees e
        LEFT JOIN departments d
            ON e.department_id = d.id
        ORDER BY e.id;
    `);
        console.log (result.rows,'rr');
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
export const createEmployee = async (employeeData) => {
    const { name, department_id, salary } = employeeData;

    const result = await pool.query(
        `INSERT INTO employees
        (name, department_id, salary)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [name, department_id, salary]
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

export const findAllWithDepartment = async () => {
  const result = await pool.query(`
    SELECT
      e.id,
      e.name,
      e.salary,
      d.name AS department
    FROM employees e
    INNER JOIN departments d
      ON e.department_id = d.id
    ORDER BY e.id
  `);

  return result.rows;
};

// ---------------------------------------------------------------------------------------------------

import employeeRepository from "../repositories/employeeRepository.js";

export const listEmployees = async (query) => {
  // 1. Read and validate pagination
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);

  if (!Number.isInteger(page) || page < 1) {
    const error = new Error("Page must be a positive integer");
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    const error = new Error("Limit must be between 1 and 100");
    error.statusCode = 400;
    throw error;
  }

  // 2. Validate salary filters
  const minSalary =
    query.minSalary === undefined ? undefined : Number(query.minSalary);

  const maxSalary =
    query.maxSalary === undefined ? undefined : Number(query.maxSalary);

  if (
    (minSalary !== undefined &&
      (!Number.isFinite(minSalary) || minSalary < 0)) ||
    (maxSalary !== undefined &&
      (!Number.isFinite(maxSalary) || maxSalary < 0))
  ) {
    const error = new Error("Salary filters must be non-negative numbers");
    error.statusCode = 400;
    throw error;
  }

  if (
    minSalary !== undefined &&
    maxSalary !== undefined &&
    minSalary > maxSalary
  ) {
    const error = new Error("minSalary cannot exceed maxSalary");
    error.statusCode = 400;
    throw error;
  }

  // 3. Validate sorting
  const allowedSortFields = ["id", "name", "salary", "created_at"];
  const sortBy = query.sortBy ?? "id";

  if (!allowedSortFields.includes(sortBy)) {
    const error = new Error("Invalid sort field");
    error.statusCode = 400;
    throw error;
  }

  const order = String(query.order ?? "asc").toLowerCase();

  if (!["asc", "desc"].includes(order)) {
    const error = new Error("Order must be asc or desc");
    error.statusCode = 400;
    throw error;
  }

  // 4. Prepare normalized filters
  const filters = {
    search: query.search?.trim() || undefined,
    department: query.department?.trim() || undefined,
    minSalary,
    maxSalary,
    sortBy,
    order,
    page,
    limit
  };

  // 5. Fetch employees and total count
  const employees = await employeeRepository.findAll(filters);
  const totalRecords = await employeeRepository.count(filters);

  return {
    employees,
    pagination: {
      currentPage: page,
      pageSize: limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit)
    }
  };
};

// ------------------------------------------------------------------------------------------------------------

// Build safe WHERE conditions for both data and count queries.
const buildWhereClause = (filters) => {
  const conditions = [];
  const values = [];

  const addCondition = (sql, value) => {
    values.push(value);
    conditions.push(sql.replace("?", `$${values.length}`));
  };

  if (filters.search) {
    addCondition(
      "name ILIKE ?",
      `%${filters.search}%`
    );
  }

  if (filters.department) {
    addCondition(
      "department = ?",
      filters.department
    );
  }

  if (filters.minSalary !== undefined) {
    addCondition(
      "salary >= ?",
      filters.minSalary
    );
  }

  if (filters.maxSalary !== undefined) {
    addCondition(
      "salary <= ?",
      filters.maxSalary
    );
  }

  return {
    whereSQL: conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "",
    values
  };
};

// const findAll = async (filters) => {
//   const { whereSQL, values } = buildWhereClause(filters);

//   // SQL identifiers cannot be passed as query parameters.
//   // Use an allowlist for the column name.
//   const allowedColumns = {
//     id: "id",
//     name: "name",
//     salary: "salary",
//     created_at: "created_at"
//   };

//   const sortColumn = allowedColumns[filters.sortBy];
//   const sortOrder = filters.order === "desc" ? "DESC" : "ASC";

//   const offset = (filters.page - 1) * filters.limit;

//   const query = `
//     SELECT id, name, department, salary, created_at
//     FROM employees
//     ${whereSQL}
//     ORDER BY ${sortColumn} ${sortOrder}
//     LIMIT $${values.length + 1}
//     OFFSET $${values.length + 2}
//   `;

//   const result = await pool.query(query, [
//     ...values,
//     filters.limit,
//     offset
//   ]);

//   return result.rows;
// };

const count = async (filters) => {
  const { whereSQL, values } = buildWhereClause(filters);

  const query = `
    SELECT COUNT(*) AS total
    FROM employees
    ${whereSQL}
  `;

  const result = await pool.query(query, values);

  return Number(result.rows[0].total);
};

export default {
//   findAll,
  count
};
