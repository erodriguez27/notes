"use strict";
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require('cors');
const http = require("http");
const app = express();
const { checkConnection } = require("./clients/database");
const noteRoutes = require("./routes/note.route");
const categoryRoutes = require("./routes/category.route");
const whiteListUrls = [
  /^(http?:\/\/)localhost(:\d+)?(\/.*)?$/
];
const optionsCors =  {
  origin: whiteListUrls,
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'sentry-trace'],
  credentials: true, 
  optionsSuccessStatus: 200,
}; 

app.use(express.json({ limit: "50mb" }));
app.use(cors(optionsCors));

// routes
app.use("/note", noteRoutes());
app.use("/category", categoryRoutes());

checkConnection();
const server = new http.Server(app);

module.exports = {
  server,
  app,
};
