import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  patchEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
  getEmployeesByMinSalaryAmount
} from "../utils/employeeUtils.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const listEmployees = () => {
  return getAllEmployees();
};

export const findEmployeeById = (id) => {
  const employee = getEmployeeById(id);

  if (!employee) {
    throw createError("Employee not found", 404);
  }

  return employee;
};

export const addEmployee = (employeeData) => {
  // Business rule: employee names must not be empty.
  if (!employeeData.name?.trim()) {
    throw createError("Employee name is required", 400);
  }

  // Business rule: salary cannot be negative.
  if (
    typeof employeeData.salary !== "number" ||
    !Number.isFinite(employeeData.salary) ||
    employeeData.salary < 0
  ) {
    throw createError("Salary must be a non-negative number", 400);
  }

  return createEmployee(employeeData);
};

export const editEmployee = (id, employeeData) => {
  findEmployeeById(id);

  const updatedEmployee = updateEmployee(id, employeeData);

  return updatedEmployee;
};

export const partiallyEditEmployee = (id, employeeData) => {
  findEmployeeById(id);

  return patchEmployee(id, employeeData);
};

export const removeEmployee = (id) => {
  findEmployeeById(id);

  return deleteEmployee(id);
};

export const findEmployeesByDepartment = (department) => {
  return getEmployeesByDepartment(department);
};

export const findEmployeesByMinimumSalary = (amount) => {
  return getEmployeesByMinSalaryAmount(amount);
};