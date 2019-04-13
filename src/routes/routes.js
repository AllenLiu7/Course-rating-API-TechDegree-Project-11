const express = require("express");
const router = express.Router();
const UsersController = require("../controller/users_controller");
const User = require("../models/users");
const Course = require("../models/courses");
const Review = require("../models/reviews");

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Course Review API"
  });
});

router.get("/api/users", UsersController.greeting);

module.exports = router;
