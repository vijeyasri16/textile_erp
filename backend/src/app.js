import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/customers", customerRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
  });
  

export default app;
