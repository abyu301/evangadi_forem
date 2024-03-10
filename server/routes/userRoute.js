const express = require("express");
const router = express.Router();

// authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// // logout
// router.get('/logout', (req, res) => {
//     res.clearCookie("jwt-token");
// })

// user controllers
const { register, login, checkUser } = require("../controller/userController");

// register route
router.post("/register", register);

// login user id
router.post("/login", login);

// check user
router.get("/check", authMiddleware, checkUser);




module.exports = router;
