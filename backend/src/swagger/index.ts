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
      name: "User",
      description: "Authentication and user management",
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  definitions: {},
};

const outputFile = "./doc/swagger.json";
const routes = ["../routers/index.ts"];

swaggerAutogen()(outputFile, routes, doc).then(async () => {
    await import("../server");
})
