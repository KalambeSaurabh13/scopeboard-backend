import * as employeeRepository from "../repositories/employeeRepository.js";

    import {
    createEmployee
} from "../repositories/employeeRepository.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const listEmployees = async (query = {}) => {
    const employees = await employeeRepository.findAll(query);

    return {
        employees,
        pagination: null
    };
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

    if (
        typeof employeeData.name !== "string" ||
        !employeeData.name.trim()
    ) {
        throw createError("Employee name is required", 400);
    }

    const departmentId = Number(employeeData.department_id);

    if (!Number.isInteger(departmentId) || departmentId <= 0) {
        throw createError("Valid department ID is required", 400);
    }

    if (
        typeof employeeData.salary !== "number" ||
        !Number.isFinite(employeeData.salary) ||
        employeeData.salary < 0
    ) {
        throw createError("Invalid salary", 400);
    }

    const validatedEmployee = {
        name: employeeData.name.trim(),
        department_id: departmentId,
        salary: employeeData.salary
    };

    return await createEmployee(validatedEmployee);
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