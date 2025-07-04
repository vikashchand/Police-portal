const express = require("express");
const env = require("dotenv").config();

const dbConfig = require("./config/dbConfig");
const cors = require("cors");

const app = express();
const fs = require("fs");
const path = require("path");

const user = require("./Routes/userRouter");
const webRouter = require("./Routes/webRoutes");
const templateRoutes = require("./Routes/templateRoutes");

const customerRoutes = require("./Routes/customerRoutes");

const bodyParser = require("body-parser");

// Use your routes

// const corsOptions = {
//    origin: 'http://localhost:3000',
//    credentials: true,
//    optionSuccessStatus: 200,
//  };
//  app.use(cors(corsOptions));

const corsOptions = {
  origin: "https://uppolice.vercel.app",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/template", templateRoutes);
app.use("/user", user);
app.use("/", customerRoutes);
app.use("/", webRouter);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`server is listening on ${PORT}`));
