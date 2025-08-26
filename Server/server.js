const express = require('express');
const routers = require('./Routes/router');
const cookieParser = require('cookie-parser');
const cors = require("cors");

require('dotenv').config();
require('./database');

const app = express();

const PORT = process.env.PORT || 3002; 

app.use(cors({
origin: [
    "http://localhost:3000",         // local 
    "https://nestora-1.onrender.com" // front end deployment
  ], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

app.use(routers);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
