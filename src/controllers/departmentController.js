import {
    getAllDepartments
} from "../services/departmentService.js";

export const getDepartments = async (req, res, next) => {
    try {
        const departments = await getAllDepartments();

        res.status(200).json({
            success: true,
            data: departments
        });
    } catch (error) {
        next(error);
    }
};