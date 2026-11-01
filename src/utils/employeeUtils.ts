export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

let employees: Employee[] = [
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

export const getAllEmployees = (): Employee[] => {
  return employees;
};

export const getEmployeeById = (
  id: number
): Employee | undefined => {
  return employees.find((employee) => employee.id === id);
};

export const getEmployeesByDepartment = (
  department: string
): Employee[] => {
  return employees.filter(
    (employee) =>
      employee.department.toLowerCase() === department.toLowerCase()
  );
};

export const createEmployee = (
  employeeData: Omit<Employee, "id">
): Employee => {
  const newEmployee: Employee = {
    id: employees.length
      ? Math.max(...employees.map((employee) => employee.id)) + 1
      : 1,
    ...employeeData,
  };

  employees.push(newEmployee);

  return newEmployee;
};

export const updateEmployee = (
  id: number,
  employeeData: Omit<Employee, "id">
): Employee | undefined => {
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

export const patchEmployee = (
  id: number,
  employeeData: Partial<Omit<Employee, "id">>
): Employee | undefined => {
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

export const deleteEmployee = (id: number): boolean => {
  const initialLength = employees.length;

  employees = employees.filter(
    (employee) => employee.id !== id
  );

  return employees.length < initialLength;
};