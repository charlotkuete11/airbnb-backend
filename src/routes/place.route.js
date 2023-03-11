const express = require('express');

const router = express.Router();

const placeController = require("../controllers/place.controller");
const verifyToken = require('../middlewares/verifyToken');
const { isOwner, belongsTo } = require('../middlewares/verifyType');
const { errorHandler } = require('../middlewares/errorHandler');

router.get('/getAll', placeController.getPlaces );

router.get('/getAllForAUser', verifyToken, placeController.getPlacesByUser)

router.post("/create", verifyToken, isOwner, placeController.addPlaces);

router.get("/:id", verifyToken, placeController.getPlaceByUser);

router.get("/get/:id", placeController.getPlaceById);

router.put("/update/:id", verifyToken, belongsTo, placeController.updatePlace)

router.delete("/:id", verifyToken, belongsTo,)   

module.exports = router;