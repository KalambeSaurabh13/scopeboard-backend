import {
  listEmployees,
  findEmployeeById,
  addEmployee as createEmployeeService,
  editEmployee as editEmployeeService,
  partiallyEditEmployee as patchEmployeeService,
  removeEmployee as removeEmployeeService,
  getEmployeesByDepartment,
  getEmployeesByMinSalaryAmount
} from "../services/employeeService.js";


export const getEmployees = async (req, res) => {
  console.log("GET EMPLOYEES CONTROLLER CALLED");

  const result = await listEmployees(req.query);

  console.log("Full result:", result);

  return res.status(200).json({
    success: true,
    data: result.employees,
    pagination: result.pagination
  });
};
export const getEmployee = async (req, res) => {
  const id = Number(req.params.id);
  const employee = await findEmployeeById(id);

  res.status(200).json({
    success: true,
    data: employee
  });
};

export const addEmployee = async (req, res, next) => {
    try {
        console.log("Request body:", req.body);
        console.log("Department ID:", req.body.department_id);

        const employee = await createEmployeeService(req.body);

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee
        });

    } catch (error) {
        next(error);
    }
};
export const editEmployee = async (req, res) => {
  const id = Number(req.params.id);
  const employee = await editEmployeeService(id, req.body);

  res.status(200).json({
    success: true,
    data: employee
  });
};

export const partiallyEditEmployee = async (req, res) => {
  const id = Number(req.params.id);
  const employee = await patchEmployeeService(id, req.body);

  res.status(200).json({
    success: true,
    data: employee
  });
};

export const removeEmployee = async (req, res) => {
  const id = Number(req.params.id);

  await removeEmployeeService(id);

  res.status(204).end();
};

export const getEmployeeByDepartment = async (req, res) => {
  const employees = await getEmployeesByDepartment(req.params.department);

  res.status(200).json({
    success: true,
    data: employees
  });
};

export const getEmployeeByMinSalaryAmount = async (req, res) => {
  const minSalary = Number(req.params.amount);

  const employees = await getEmployeesByMinSalaryAmount(minSalary);

  res.status(200).json({
    success: true,
    data: employees
  });
};