const express = require("express");
const Router = express.Router();

const { postAnswer, getAllAnswersAllongWithTheirQuestions } = require("../controller/answerController");
const authMiddleware = require("../middleware/authMiddleware");

Router.post("/:questionid/answers", authMiddleware, postAnswer);
Router.get("/:questionid", authMiddleware, getAllAnswersAllongWithTheirQuestions);


module.exports = Router;
