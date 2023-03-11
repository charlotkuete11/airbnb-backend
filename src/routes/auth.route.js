const express = require('express');

const { body } = require('express-validator');
const router = express.Router();
const { checkAuth, validation } = require("../middlewares/validators")

const authController = require("../controllers/auth.controller");
const verifyToken = require('../middlewares/verifyToken');

router.post("/register",
    [checkAuth, validation],
    authController.register);

router.post("/signIn", authController.signIn);


module.exports = router;