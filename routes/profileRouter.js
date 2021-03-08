const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/userModel')
const uploads = require('../middleware/file').single('avatar')
const router = express.Router()

router.get('/', auth, async (req, res) => {
    res.render("profile", {
      title: "Профиль",
      isProfile: true,
      user: req.user,
      // csrf: req.csrfToken(),
    });
})

router.post("/user", auth, uploads,  async (req, res) => {
    // req.body._csrf = req.csrfToken();
    // console.log(req.body._csrf);

  try {
    const user = await User.findById(req.user._id);
    const toChange = {
      name: req.body.title,
    };
    console.log(req.file);

    if (req.file) {
      toChange.avatar = req.file.path;
    }

    Object.assign(user, toChange);

    await user.save();

    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router