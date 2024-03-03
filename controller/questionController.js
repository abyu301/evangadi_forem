const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfige");

async function postQuestion(req, res) {
  const { question, questiondescription, questionCodeBlock, tags } = req.body;

  const usersid = req.user.usersid; 

  if (!question) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Missing required fields" });
  }

  try {
    await dbConnection.query("INSERT INTO questions (question, questiondescription, questionCodeBlock, tags, usersid) VALUES (?, ?, ?, ?, ?)", [
      question, questiondescription, questionCodeBlock, tags, usersid
    ]);
    return res.status(StatusCodes.CREATED).json({ msg: "Question posted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again" });
  }
}

async function getAllQuestions(req, res) {
  try {
    const questions = await dbConnection.query("SELECT * FROM questions");
    return res.status(StatusCodes.OK).json({ questions: questions[0] });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong while fetching questions" });
  }
}

module.exports = { postQuestion, getAllQuestions };
