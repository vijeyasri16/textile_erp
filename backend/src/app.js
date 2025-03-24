import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import customerRoutes from "./routes/customerRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import machineRoutes from "./routes/machineRoutes.js";
import fabricRoutes from "./routes/fabricRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import goodsInwardRoutes from "./routes/goodsInward.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/customers", customerRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/machines", machineRoutes);
app.use("/fabrics", fabricRoutes);
app.use("/employees", employeeRoutes);
app.use("/rawmaterials", rawMaterialRoutes);
app.use("/goodsinwards", goodsInwardRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;

