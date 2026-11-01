
export interface Employee {
    id: number;
    name: string;
    department: string;
    salary: number;
}

const employees: Employee[] = [
    {
        id: 1,
        name: "Rahul",
        department: "IT",
        salary: 50000
    },
    {
        id: 2,
        name: "Priya",
        department: "HR",
        salary: 45000
    },
    {
        id: 3,
        name: "Amit",
        department: "IT",
        salary: 60000
    }
];

export const getAllEmployees = (): Employee[] => {
    return employees;
};

export const getEmployeeById = (
    id: number
): Employee | undefined => {
    return employees.find(employee => employee.id === id);
};

export const getEmployeesByDepartment = (
    department: string
): Employee[] => {
    return employees.filter(
        employee =>
            employee.department.toLowerCase() ===
            department.toLowerCase()
    );
};
