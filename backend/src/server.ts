import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes";
import categoryRouter from "./routes/category.routes";
import GlobalErrorValidator from "./middleware/GlobalErrorValidator";
import refreshRouter from "./routes/refresh.routes";
import ExerciseRoter from "./routes/exercise.routes";
import FavoriteRoter from "./routes/favorite.routes";
import UserRouter from "./routes/user.routes";

const generalRateLimit = rateLimit({
  windowMs: 15 * 1000 * 60,
  max: 500,
});

const port = process.env?.PORT || 3001;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PATCH", "DELETE"],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(generalRateLimit);

app.use(authRouter);
app.use("/category", categoryRouter);
app.use("/refresh", refreshRouter);
app.use("/exercise", ExerciseRoter);
app.use("/favorite", FavoriteRoter);
app.use("/users", UserRouter);

app.use(GlobalErrorValidator);

app.listen(port, () => {
  console.log("Server listened sucfull");
});
