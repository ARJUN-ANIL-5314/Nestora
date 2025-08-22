const express = require('express');
const routers = require('./Routes/router');
const cookieParser = require('cookie-parser');
const cors = require("cors");

require('dotenv').config();
require('./database');

const app = express();
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"] // Allow necessary headers
}));

const port = 3002

console.log(port);


app.use(express.json());
app.use(cookieParser());

app.use(routers);


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
