function authorizeRoles(...allowedRoles) {

    return function (req, res, next) {

        // Check whether user exists
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        // Check whether user's role is allowed
        if (!allowedRoles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "You don't have permission to access this resource"
            });
        }

        // User has permission
        next();
    };
}

export default authorizeRoles;