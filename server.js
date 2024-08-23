// server.js
import express from "express";
import authRouter from "./routes/authRoutes.js";
import fishRouter from "./routes/fishRoutes.js";
import {authMiddleware} from "./middleware/authMiddleware.js"

import cors from 'cors'
import morgan from 'morgan'

const app = express();
const PORT = process.env.PORT || 5000;

app.disable('x-powered-by');

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/fish", authMiddleware);
app.use("/fish", fishRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
