const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Course = require("../models/courses");
const Review = require("../models/reviews");
const mid = require("../../middleware");

router.get("/", (req, res) => {
  res.json({
    message: "Home Page"
  });
});

//Returns the currently authenticated user
router.get("/api/users", mid.authenticateUser, (req, res, next) => {
  res.json(req.currentUser);
  res.end();
});

//Creates a user, sets the Location header to "/", and returns no content
router.post("/api/users", (req, res, next) => {
  User.create(req.body)
    .then(() => {
      res.status(201);
      res.location("/");
      res.end();
    })
    .catch(next);
});

//Returns the Course "_id" and "title" properties
router.get("/api/courses", (req, res, next) => {
  Course.find({})
    .select("_id, title")
    .then(courses => res.json(courses))
    .catch(next);
});

//Returns all Course properties and related documents for the provided course ID
router.get("/api/courses/:courseId", (req, res, next) => {
  Course.findById(req.params.courseId)
    .then(courses => res.json(courses))
    .catch(next);
});

//Creates a course, sets the Location header, and returns no content
router.post("/api/courses", mid.authenticateUser, (req, res, next) => {
  Course.create(req.body)
    .then(() => {
      res.status(201);
      res.location("/");
      res.end();
    })
    .catch(next);
});

//Updates a course and returns no content
router.put("/api/courses/:courseId", mid.authenticateUser, (req, res, next) => {
  Course.findByIdAndUpdate(req.params.courseId, req.body)
    .then(() => {
      res.status(204);
      res.end();
    })
    .catch(next);
});

//Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
router.post(
  "/api/courses/:courseId/reviews",
  mid.authenticateUser,
  (req, res, next) => {
    Course.findOne({ _id: req.params.courseId })
      .populate("reviews")
      .then(course => {
        course.reviews.push(req.body);
        course.save(err => {
          if (err) {
            err.status = 400;
            next(err);
          }
          res.location("/");
          res.end();
        });
      })
      .catch(next);
  }
);

module.exports = router;
