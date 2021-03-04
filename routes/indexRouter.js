const express = require('express')


const router = express.Router()


router.get("/", async (req, res) => {
  res.render("index", {
    title: "Главная страница",
    isHome: true,
  });
});

module.exports = router