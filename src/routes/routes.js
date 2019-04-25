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
  User.create(req.body, (err, user) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
    res.status(201);
    res.location("/");
    res.end();
  });
});

//Returns the Course "_id" and "title" properties
router.get("/api/courses", (req, res, next) => {
  Course.find({})
    .select("_id, title")
    .exec((err, courses) => {
      if (err) return next(err);
      res.json(courses);
    });
});

//Returns all Course properties and related documents for the provided course ID
router.get("/api/courses/:courseId", (req, res, next) => {
  Course.findById(req.params.courseId)
    .populate("user")
    .populate("reviews")
    .exec((err, course) => {
      if (err) {
        err.status = 400;
        return next(err);
      }
      res.json(course);
    });
});

//Creates a course, sets the Location header, and returns no content
router.post("/api/courses", mid.authenticateUser, (req, res, next) => {
  Course.create(req.body, (err, course) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
    res.status(201);
    res.end();
  });
});

//Updates a course and returns no content
router.put("/api/courses/:courseId", mid.authenticateUser, (req, res, next) => {
  Course.findByIdAndUpdate(req.params.courseId, req.body).exec(err => {
    if (err) {
      err.status = 400;
      return next(err);
    }
    res.status(204);
    res.end();
  });
});

//Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
router.post(
  "/api/courses/:courseId/reviews",
  mid.authenticateUser,
  (req, res, next) => {
    const review = new Review(req.body);
    review.save(err => {
      if (err) {
        err.status = 400;
        return next(err);
      }

      //find the course by courseId
      Course.findById(req.params.courseId)
        .populate("reviews")
        .exec((err, course) => {
          if (err) {
            err.status = 400;
            return next(err);
          }

          //push the review to the course
          course.reviews.push(review);
          course.save(err => {
            if (err) {
              err.status = 400;
              return next(err);
            }
            res.status(201);
            res.location("/");
            res.end();
          });
        });
    });
  }
);

module.exports = router;
