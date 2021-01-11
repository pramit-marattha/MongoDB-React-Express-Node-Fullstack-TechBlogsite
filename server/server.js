const morgan = require("morgan");
const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoutes = require("./routes/blog")
const authRoutes = require("./routes/auth")

const app = express()

const PORT = process.env.PORT || 4000
const url = process.env.MONGODB_URI

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify:false,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
      console.log('MongoDB database successfully connected.')
  } else {
      console.log('Error in DB connection: ' + err)
  }
});

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes middlewares
app.use("/api",blogRoutes);
app.use("/api",authRoutes);
// cors 
app.use(cors());


app.listen(PORT, (req, res) => {
  console.log(`Currently server is running at http://localhost:${PORT}`)
})