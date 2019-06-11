const swaggerJsdoc = require( "swagger-jsdoc" );

const options = {
    swaggerDefinition: {
        info: {
            title: "Invoice",
            version: "1.0.0",
            description: "Invoice API for the DevHeaven platform",
            contact: {
                name: "DevHeaven",
                url: "http://devheaven.nl",
                email: "devheavenplatform@gmail.com",
            },
        },
        openapi: "3.0.1",
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [
        "./src/routes/*.js",
        "./src/models/*.js",
    ],
};

module.exports = swaggerJsdoc( options );
