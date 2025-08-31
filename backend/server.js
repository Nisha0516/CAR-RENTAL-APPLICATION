const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");  // ✅ should match export
const cors = require("cors");

dotenv.config();
connectDB();  // ✅ call it as a function
