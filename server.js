// server.js
import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;
import authRouter from "./routes/authRoutes"
import fishRouter from "./routes/fishRoutes"

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });

app.use("/auth", authRouter)
app.use("/fish", fishRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
