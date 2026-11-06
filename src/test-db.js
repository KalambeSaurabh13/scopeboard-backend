import pool from "./config/db.js";

const testDatabase = async () => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS current_time"
    );

    console.log("Database connected successfully!");
    console.log("PostgreSQL time:", result.rows[0].current_time);
  } catch (error) {
    console.error("Database connection failed :", error.message);
  } finally {
    await pool.end();
  }
};

testDatabase();
const result = await pool.query(
  "SELECT * FROM employees"
);

console.log(result.rows);


// const result = await pool.query(
// "UPDATE employees SET salary = 70000 WHERE id = 1 RETURNING *;"
// );
// console.log(result.rows);