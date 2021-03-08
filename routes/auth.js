const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { validationResult} = require('express-validator')
const {registerValidators} = require('../utils/validators')
const router = express.Router()

router.get('/login', (req, res) => {
    res.render("login", {
      title: "Авторизация",
      isLogin: true,
      loginError: req.flash("loginError"),
      registerError: req.flash("registerError"),
    });
})


router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login#login");
    })
  
});


router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body
        const candidate = await User.findOne({ email })

        console.log(candidate)

        if(candidate){
            const areSame = await bcrypt.compareSync(password, candidate.password)
            
            if (areSame) {
              const user = candidate;
              req.session.user = user;
              req.session.isAuthenticated = true;
              req.session.save((err) => {
                if (err) {
                  throw err;
                } else {
                  res.redirect("/");
                }
              });
            } else {
              req.flash("loginError", "Неверный пароль");
              res.redirect("/auth/login#login");
            }
        } else {
            req.flash("loginError", "Такого пользователя не существует");
            res.redirect('/auth/login#login')
        }

    } catch(err) {
        console.log(err)
    }
})


router.post("/register", registerValidators, async (req, res) => {
  try {
    const { email, password, repeat, name } = req.body;
    const candidate = await User.findOne({ email });

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      req.flash("registerError", errors.array()[0].msg)
      return res.status(422).redirect('/auth/login#register')
    }

    if (candidate) {
      req.flash("registerError", "Пользователь с таким email уже существует");
      res.redirect("/auth/login#register");
    } else {

        const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({
        email,
        name,
        password: hashPassword,
        cart: { items: [] },
      });
      await user.save();
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router