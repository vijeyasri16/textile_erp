import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import customerRoutes from "./routes/customerRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import machineRoutes from "./routes/machineRoutes.js";
import fabricRoutes from "./routes/fabricRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import goodsInwardsRoutes from "./routes/goodsInwardsRoutes.js";
import labEntryRoutes from "./routes/labEntryRoutes.js";
import dyeingPlanningRoutes from "./routes/dyeingPlanningRoutes.js"
import jobCardRoutes from "./routes/jobCardRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import finishingRoutes from './routes/finishingRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/customers", customerRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/machines", machineRoutes);
app.use("/fabrics", fabricRoutes);
app.use("/employees", employeeRoutes);
app.use("/rawmaterials", rawMaterialRoutes);
app.use("/goodsInwards", goodsInwardsRoutes);
app.use("/labEntry", labEntryRoutes);
app.use("/dyeingPlanning", dyeingPlanningRoutes);
app.use("/jobCard", jobCardRoutes);
app.use("/collection", collectionRoutes);
app.use('/finishing', finishingRoutes)
app.use('/delivery', deliveryRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;

