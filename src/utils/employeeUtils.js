
let employees = [
  {
    id: 1,
    name: "Rahul",
    department: "IT",
    salary: 50000,
  },
  {
    id: 2,
    name: "Priya",
    department: "HR",
    salary: 45000,
  },
  {
    id: 3,
    name: "Amit",
    department: "Finance",
    salary: 60000,
  },
];

// Get all employees
export const getAllEmployees = () => {
  return employees;
};

// Get employee by ID
export const getEmployeeById = (id) => {
  return employees.find((employee) => employee.id === id);
};

// Get employees by department
export const getEmployeesByDepartment = (department) => {
  return employees.filter(
    (employee) =>
      employee.department.toLowerCase() === department.toLowerCase()
  );
};

// Get employees by minimum salary
export const getEmployeesByMinSalaryAmount = (minSalary) => {
  return employees.filter(
    (employee) => employee.salary >= minSalary
  );
};

// Create employee
export const createEmployee = (employeeData) => {
  const newEmployee = {
    id: employees.length
      ? Math.max(...employees.map((employee) => employee.id)) + 1
      : 1,
    ...employeeData,
  };

  employees.push(newEmployee);

  return newEmployee;
};

// Update complete employee (PUT)
export const updateEmployee = (id, employeeData) => {
  const index = employees.findIndex(
    (employee) => employee.id === id
  );

  if (index === -1) return undefined;

  employees[index] = {
    id,
    ...employeeData,
  };

  return employees[index];
};

// Update selected employee fields (PATCH)
export const patchEmployee = (id, employeeData) => {
  const index = employees.findIndex(
    (employee) => employee.id === id
  );

  if (index === -1) return undefined;

  employees[index] = {
    ...employees[index],
    ...employeeData,
  };

  return employees[index];
};

// Delete employee
export const deleteEmployee = (id) => {
  const initialLength = employees.length;

  employees = employees.filter(
    (employee) => employee.id !== id
  );

  return employees.length < initialLength;
};
