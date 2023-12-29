const express = require('express');
const controller = require("../controllers/userController");
const validateToken = require("../middleware/tokens")
const router = express.Router();
router.post("/", controller.registerUser),("/login", controller.loginUser),("/password", controller.forgetpassword);
router.put("/:id",validateToken.verifyTokenAndAuthorization,controller.update);

module.exports = router;