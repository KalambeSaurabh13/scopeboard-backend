import {
  listEmployees,
  findEmployeeById,
  addEmployee as createEmployeeService,
  editEmployee as editEmployeeService,
  partiallyEditEmployee as patchEmployeeService,
  removeEmployee as removeEmployeeService,
  findEmployeesByDepartment,
  findEmployeesByMinimumSalary
} from "../services/employeeService.js";

export const getEmployees = (req, res) => {
  const employees = listEmployees();

  res.status(200).json({
    success: true,
    data: employees
  });
};

export const getEmployee = (req, res) => {
  const id = Number(req.params.id);
  const employee = findEmployeeById(id);

  res.status(200).json({
    success: true,
    data: employee
  });
};

export const addEmployee = (req, res) => {
  const employee = createEmployeeService(req.body);

  res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: employee
  });
};

export const editEmployee = (req, res) => {
  const id = Number(req.params.id);
  const employee = editEmployeeService(id, req.body);

  res.status(200).json({
    success: true,
    data: employee
  });
};

export const partiallyEditEmployee = (req, res) => {
  const id = Number(req.params.id);
  const employee = patchEmployeeService(id, req.body);

  res.status(200).json({
    success: true,
    data: employee
  });
};

export const removeEmployee = (req, res) => {
  const id = Number(req.params.id);
  removeEmployeeService(id);

  res.status(204).end();
};

export const getEmployeeByDepartment = (req, res) => {
  const employees = findEmployeesByDepartment(req.params.department);

  res.status(200).json({
    success: true,
    data: employees
  });
};

export const getEmployeeByMinSalaryAmount = (req, res) => {
  const amount = Number(req.params.amount);
  const employees = findEmployeesByMinimumSalary(amount);

  res.status(200).json({
    success: true,
    data: employees
  });
};