// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/authRoutes")
const fishRouter = require("./routes/fishRoutes")

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });

app.use("/auth", authRouter)
app.use("/fish", fishRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
