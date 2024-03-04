const dbConnection = require("../db/dbConfige");
const { StatusCodes } = require("http-status-codes");

const postAnswer = async (req, res) => {
    let userid = req.user.usersid;
    let questionid = req.params.questionid;

    const { answer, answerCodeBlock } = req.body;

    if (!answer) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Answer cannot be empty" });
    }

    try {
        await dbConnection.query(
            "INSERT INTO answertable (usersid, questionid, answer, answerCodeBlock) VALUES (?,?,?,?)",
            [userid, questionid, answer, answerCodeBlock]
        );
        console.log("Answer posted successfully:", answer);
        return res.status(StatusCodes.CREATED).json({ msg: "Answer posted successfully" });
    } catch (error) {
        console.error(error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong, try again later!......" });
    }
};

const getAllAnswersAllongWithTheirQuestions = async (req, res) => {
    const questionsid = req.params.questionid;
    console.log("Question ID:", questionsid); // Log the value of questionsid

    try {
        let questionAndAnswers = await dbConnection.query(`SELECT * FROM answertable 
            JOIN questions ON questions.questionid = answertable.questionid 
            JOIN users ON users.usersid = answertable.usersid
            WHERE answertable.questionid = '${questionsid}' 
            ORDER BY answerid DESC`);

        if (questionAndAnswers[0].length === 0) {
            console.log("No answers found for question ID:", questionsid);
        }

        res.status(200).json({
            status: true,
            total: questionAndAnswers[0].length,
            answers: questionAndAnswers[0],
        });
    } catch (error) {
        console.error("Error retrieving answers:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}


module.exports = { postAnswer, getAllAnswersAllongWithTheirQuestions };
