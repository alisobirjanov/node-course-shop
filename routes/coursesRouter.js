const express = require("express");
// const Course = require("../models/course");
const Course = require("../models/courseModel");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  // const courses = await Course.getAll();
  const courses = await Course.find().populate('userId', 'name email');

  // console.log(courses)

  res.render("courses", {
    title: "Курсы",
    isCourses: true,
    courses,
  });
});

router.get("/:id",  async (req, res) => {
  // const course = await Course.getById(req.params.id)
  const course = await Course.findById(req.params.id).lean();
  res.render("cards", {
    layout: "empty",
    title: `Курс ${course.title}`,
    course,
  });
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  // const course = await Course.getById(req.params.id)
  const course = await Course.findById(req.params.id).lean();
  // console.log(course)
  res.render("course-edit", {
    title: `Редактировать ${course.title}`,
    course,
  });
});

router.post("/edit", auth, async (req, res) => {
  // await Course.update(req.body)
  // console.log(req.params.id)
  const { id } = req.body;
  delete req.body.id;
  await Course.findByIdAndUpdate(id, req.body);
  res.redirect("/courses");
});

router.post("/remove", auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect("/courses");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
