// const express = require("express");
// const Router = express.Router();

// const { postQuestion } = require("../controller/questionController");
// const { singleQuestion } = require("../controller/questionController");
// const authMiddleware = require("../middleware/authMiddleware");

// Router.get("/all-questions", authMiddleware, postQuestion);
// Router.post("/add-questions", authMiddleware, postQuestion);
// Router.get("/:questionid", authMiddleware, singleQuestion);

// module.exports = Router;


const express = require("express");
const Router = express.Router();

const { getAllQuestions } = require("../controller/questionController");
const authMiddleware = require("../middleware/authMiddleware");

Router.get("/all-questions", getAllQuestions);

module.exports = Router;
