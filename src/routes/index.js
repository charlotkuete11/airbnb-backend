const express = require('express');

const router = express.Router();

const userRoutes = require("./user.route");
const authRoutes = require('./auth.route');
const placeRoutes = require("./place.route");
const typePlaceRoutes = require("./typePlace.route")

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use("/place", placeRoutes);
router.use("/type-place", typePlaceRoutes);

module.exports = router;