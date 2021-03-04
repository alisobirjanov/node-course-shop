const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/userModel')
const uploads = require('../middleware/file').single('avatar')
const router = express.Router()

router.get('/', auth, async (req, res) => {
    res.render('profile', {
        title: 'Профиль',
        isProfile: true,
        user: req.user
    })
})

router.post("/", auth, uploads, async (req, res) => {
  try {
      console.log(req.file)
    const user = await User.findById(req.user._id);
    console.log(req.body);
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