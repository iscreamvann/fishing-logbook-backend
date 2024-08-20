// server.js
import express from "express";
import authRouter from "./routes/authRoutes.js";
import fishRouter from "./routes/fishRoutes.js";

import cors from 'cors'
import morgan from 'morgan'

const app = express();
const PORT = process.env.PORT || 5000;

app.disable('x-powered-by');

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });

app.use("/auth", authRouter);
app.use("/fish", fishRouter);
app.get("/test", (req, res) => {
res.status(200).json({message: "test"})
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
