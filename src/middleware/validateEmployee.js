function validateEmployee(req, res, next) {

    const { name, email, salary } = req.body;

    const errors = [];

    // Validate name
    // if (
    //     typeof name !== "string" ||
    //     name.trim().length < 2
    // ) {
    //     errors.push("Name must contain at least 2 characters");
    // }



    // Validate salary
    if (
        typeof salary !== "number" ||
        !Number.isFinite(salary) ||
        salary < 0
    ) {
        errors.push("Salary must be a valid non-negative number");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }

    // Normalize name and email
    req.body.name = name;
    req.body.email = email;

    next();
}

export default validateEmployee;