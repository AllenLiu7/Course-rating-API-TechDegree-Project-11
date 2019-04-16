const express = require("express");
const router = express.Router();
const UsersController = require("../controller/users_controller");
const User = require("../models/users");
const Course = require("../models/courses");
const Review = require("../models/reviews");

// router.param("courseId", function(req, res, next, id) {
//   Course.findById(id, function(err, doc) {
//     if (err) return next(err);
//     if (!doc) {
//       err = new Error("Not Found");
//       err.status = 400;
//       return next(err);
//     }
//     req.course = doc;
//     return next();
//   });
// });

router.get("/", (req, res) => {
  res.json({
    message: "Home Page"
  });
});

//Returns the currently authenticated user
router.get("/api/users", (req, res, next) => {
  User.find({})
    .then(users => {
      res.json(users);
    })
    .catch(next);

  // User.find({}).exec(function(err, users) {
  //   if (err) return next(err);
  //   res.json(users);
  // });
});

//Creates a user, sets the Location header to "/", and returns no content
router.post("/api/users", (req, res, next) => {
  User.create(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(next);

  // let user = new User(req.body);
  // user.save(function(err, user) {
  //   if (err) return next(err);
  //   res.status(201);
  //   res.redirect("/");
  //   res.jason();
  // });
});

//Returns the Course "_id" and "title" properties
router.get("/api/courses", (req, res, next) => {
  Course.find({})
    .select("_id, title")
    .then(courses => res.json(courses))
    .catch(next);

  // Course.find({})
  //   .select("_id, title")
  //   .exec(function(err, courses) {
  //     if (err) return next(err);
  //     res.json(courses);
  //   });
});

//Returns all Course properties and related documents for the provided course ID
router.get("/api/courses/:courseId", (req, res, next) => {
  Course.findById(req.params.courseId)
    .then(courses => res.json(courses))
    .catch(next);

  // Course.find({})
  //   .where("_id")
  //   .equals(req.params.courseId)
  //   .exec(function(err, courses) {
  //     if (err) return next(err);
  //     res.json(courses);
  //   });
});

//Creates a course, sets the Location header, and returns no content
router.post("/api/courses", (req, res, next) => {
  Course.create(req.body)
    .then(course => {
      res.json(course);
    })
    .catch(next);

  //   let course = new Course(req.body);
  //   course.save(function(err, course) {
  //     if (err) return next(err);
  //     res.status(400);
  //     // res.redirect("/");
  //   });
});

//Updates a course and returns no content
router.put("/api/courses/:courseId", (req, res, next) => {
  Course.findByIdAndUpdate(req.params.courseId, req.body)
    .then(() => {
      res.json({ hi: "there" });
    })
    .catch(next);

  // Course.findByIdAndUpdate(req.params.courseId, req.body, (err, course) => {
  //   if (err) return next(err);
  //   res.json();
  // });
});

//Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
router.post("/api/courses/:courseId/reviews", (req, res, next) => {
  Course.findOne({ _id: req.params.courseId })
    .populate("reviews")
    .then(course => {
      course.reviews.push(req.body);
      course.save();
      res.json(course.reviews);
    })
    .catch(next);

  // req.course.reviews.push(req.body);
  // req.course.save(function(err, course) {
  //   if (err) return next(err);
  //   res.status(201);
  //   res.json(course);
  // });
});

module.exports = router;
