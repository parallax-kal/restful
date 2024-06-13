import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "DistrEquip",
    description: "DistrEquip API documentation",
  },
  host: `localhost:5000`,
  basePath: "/v1/api",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Users",
      description: "Authentication and users management",
    },
    {
      name: "Employees",
      description: "Employees management",
    },
    {
      name: "Laptops",
      description: "Laptops management",
    },
  ],
  security: [
    {
      Bearer: [],
    },
  ],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      bearerFormat: "JWT",
      scheme: "bearer",
    },
  },
  definitions: {},
};

const outputFile = "./doc/swagger.json";
const routes = ["../routers/index.ts"];

swaggerAutogen()(outputFile, routes, doc)
