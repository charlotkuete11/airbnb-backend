const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require('express-validator');
const { checkEmail, validation } = require("../middlewares/validators")

const guardUserAccess = require('../middlewares/guardUsersAccess');

const verifyToken = require('../middlewares/verifyToken');


router.get('/users', verifyToken, guardUserAccess, userController.findAll);

// url: /user?id
router.get("/", verifyToken, userController.findById);

router.delete("/delete", userController.delete);

router.put("/update", verifyToken, checkEmail, validation, userController.update);


module.exports = router;