import express from "express";
import cors from "cors";
import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(__dirname, "../.env") });
import api from "./routers";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/doc/swagger.json";


const app = express();


app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  )
  .use(`/${process.env.VERSION}/api`, api);

app.get("/", (req, res) => {
  res.status(200).json("Welcome to DistrEquip!");
});

app.use("/v1/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("*", (req, res) => {
  res.status(404).json("Resource not found");
});

app.listen(process.env.PORT, () => {
  console.log(`Access the server at http://localhost:${process.env.PORT}`);
});
