import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import categoryRouter from "./routes/category.routes";
import GlobalErrorValidator from "./middleware/GlobalErrorValidator";

dotenv.config();
const app = express();
const port = process.env?.PORT || 3001;

app.use(express.json());

app.use(authRouter);
app.use("/category/", categoryRouter);

app.use(GlobalErrorValidator);
app.listen(port, () => {
  console.log("Server listened sucfull");
});
