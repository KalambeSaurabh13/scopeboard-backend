import {
    findAllDepartments
} from "../repositories/departmentRepository.js";

export const getAllDepartments = async () => {
    return await findAllDepartments();
};