const express = require("express");
const Course = require("../models/courseModel");
// const Card = require('../models/card')
const auth = require("../middleware/auth");
const router = express.Router();


function mapCartItem(cart) {
return cart.items.map((c) => ({
    ...c.courseId._doc,
    id: c.courseId.id,
    count: c.count,
}));
}


function computePrice(courses) {
  return courses.reduce((total, course) => {
    return (total += course.price * course.count);
  }, 0);
}

router.post("/add", auth, async (req, res) => {
  //  const course = await Course.getById(req.body.id)
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);
  res.redirect("/card");
});

router.get("/", auth, async (req, res) => {
  // const card = await Card.fetch()

  const user = await req.user.populate("cart.items.courseId").execPopulate();

  const courses = mapCartItem(user.cart);


  res.render("card", {
    title: "Корзина",
    isCard: true,
    course: courses,
    price: computePrice(courses),
  });
});

router.delete("/remove/:id", auth, async (req, res) => {
//   const card = await Card.remove(req.params.id);
await req.user.removeFromCart(req.params.id)

const user = await req.user.populate('cart.items.courseId').execPopulate()
const courses = mapCartItem(user.cart)
const card = {
    courses,
    price: computePrice(courses),
    csrf: req.csrfToken()
}
  res.status(200).json(card);
});

module.exports = router;
