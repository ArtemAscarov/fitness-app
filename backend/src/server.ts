import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import categoryRouter from "./routes/category.routes";
import { CheckAuth } from "./middleware/CheckAuth";

dotenv.config();
const app = express();
const port = process.env?.PORT || 3001;

app.use(express.json());

app.use(authRouter);
app.use("/category/", CheckAuth, categoryRouter);

app.listen(port, () => {
  console.log("Server listened sucfull");
});
