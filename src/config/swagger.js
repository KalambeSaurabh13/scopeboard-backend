import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.3",

        info: {
            title: "ScopeBoard ERP API",
            version: "1.0.0",
            description: "API documentation for ScopeBoard ERP"
        },

        servers: [
            {
                url: "http://localhost:5000",
                description: "Local Development Server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your JWT access token"
                }
            }
        }
    },

    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;