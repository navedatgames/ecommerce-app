require("dotenv").config();
const express = require("express");

const productRouter = require("./routes/productRouter");
const connectDB = require("./db/connect");

const app = express();

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connect to database");
  })
  .catch(() => {});

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
