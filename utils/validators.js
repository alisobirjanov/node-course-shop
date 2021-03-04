const { body } = require("express-validator");

exports.registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Введите корректный email")
    .normalizeEmail(),
  body("password", "Пароль должен быть минимум 6 символов")
    .isLength({ min: 6, max: 100 })
    .isAlphanumeric()
    .trim(),
  body("repeat")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Пароли должны совпвдать");
      }
      return true;
    })
    .trim(),
  body("name", "Имя должен быть минимум 3 символов")
    .isLength({
      min: 3,
    })
    .trim(),
];



exports.courseValidators = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Минимальная длинна названия 3 символа")
    .trim(),
  body("price").isNumeric().withMessage("Введите корректную цену"),
  // body("img", "Введите корректный Url картинки").isBoolean()
];