import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

import authRouter from "./routes/auth.routes";
import categoryRouter from "./routes/category.routes";
import GlobalErrorValidator from "./middleware/GlobalErrorValidator";
import refreshRouter from "./routes/refresh.routes";
import ExcerciseRoter from "./routes/excercise.routes";
import FavoriteRoter from "./routes/favorite.routes";

const generalRateLimit = rateLimit({
  windowMs: 15 * 1000 * 60,
  max: 500,
});
dotenv.config();
const port = process.env?.PORT || 3001;

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PATCH", "DELETE"],
  }),
);

app.use(generalRateLimit);

app.use(authRouter);
app.use("/category", categoryRouter);
app.use("/refresh", refreshRouter);
app.use("/excercise", ExcerciseRoter);
app.use("/favorite", FavoriteRoter);

app.use(GlobalErrorValidator);

app.listen(port, () => {
  console.log("Server listened sucfull");
});
