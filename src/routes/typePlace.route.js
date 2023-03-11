const express = require('express');
const router = express.Router();
const typePlaceController = require("../controllers/typePlace.controller");

const verifyToken = require('../middlewares/verifyToken');
const { verifyAdmin } = require("../middlewares/verifyType");


router.get('/', typePlaceController.getAll);

router.post("/", verifyToken, verifyAdmin, typePlaceController.createTypePlace);

router.put("/update/:id", verifyToken, verifyAdmin, typePlaceController.updateTypePlace);

router.delete("/delete/:id", verifyToken, verifyAdmin, typePlaceController.deleteTypePlace);

module.exports = router;