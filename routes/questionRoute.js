// questionRoute.js

const express = require("express");
const Router = express.Router();
const { postQuestion } = require("../controller/questionController");
const authMiddleware = require("../middleware/authMiddleware");

Router.get("/all-questions", authMiddleware, postQuestion);
Router.post("/add-questions", authMiddleware, postQuestion);

module.exports = Router;
