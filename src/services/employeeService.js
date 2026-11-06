import * as employeeRepository from "../repositories/employeeRepository.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const listEmployees = async () => {
  return await employeeRepository.findAll();
};

export const findEmployeeById = async (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw createError("Invalid employee ID", 400);
  }

  const employee = await employeeRepository.findById(id);

  if (!employee) {
    throw createError("Employee not found", 404);
  }

  return employee;
};

export const addEmployee = async (employeeData) => {
  if (!employeeData.name?.trim()) {
    throw createError("Employee name is required", 400);
  }

  if (!employeeData.department?.trim()) {
    throw createError("Department is required", 400);
  }

  if (
    typeof employeeData.salary !== "number" ||
    !Number.isFinite(employeeData.salary) ||
    employeeData.salary < 0
  ) {
    throw createError("Invalid salary", 400);
  }

  return await employeeRepository.create(employeeData);
};

export const editEmployee = async (id, employeeData) => {
  await findEmployeeById(id);

  return await employeeRepository.update(id, employeeData);
};

export const partiallyEditEmployee = async (id, employeeData) => {
  await findEmployeeById(id);

  return await employeeRepository.patch(id, employeeData);
};

export const removeEmployee = async (id) => {
  await findEmployeeById(id);

  return await employeeRepository.remove(id);
};

export const getEmployeesByDepartment = async (department) => {
  return employeeRepository.findByDepartment(department);
};

export const getEmployeesByMinSalaryAmount = async (minSalary) => {
  return employeeRepository.findByMinSalaryAmount(minSalary);
};