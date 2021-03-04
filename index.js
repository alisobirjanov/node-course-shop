const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
// const csurf = require("csurf");
const helmet = require('helmet')
const compression = require('compression')
const flash = require("connect-flash");
const connectDb = require('./config/config')
const session = require('express-session')
const MongoStore = require("connect-mongodb-session")(session);
const indexRouter = require("./routes/indexRouter");
const coursesRouter = require("./routes/coursesRouter");
const cardRouter = require("./routes/card");
const addRouter = require("./routes/addRouter");
const ordersRouter = require('./routes/ordersRouter')
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profileRouter')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const errorHandler = require('./middleware/error')

const keys = require('./keys/index')

const app = express();

connectDb(keys.MONGODB_URI);
// const MONGODB_URI = "mongodb://localhost:27017/online_magazin";

// const hbs = expHbs.create({
//   defaultLayout: "main",
//   extname: "hbs",
// });

// app.engine("hbs", hbs.engine);
app.set("view engine", "pug");
app.set("views", "views");

const store = new MongoStore({
  collection: "sessions",
  uri: keys.MONGODB_URI,
});


// app.use( async (req, res, next) => {
//   try{
//     User.findById("60327fe43ffc06314cc1d83d", (err, data) => {
//       req.user = data;
//       next();
//     });
    
//   } catch(err) {
//     console.log(err)
//   }
// })



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))

// app.use(csurf());
app.use(flash());
app.use(helmet())
app.use(compression());
app.use(varMiddleware)
app.use(userMiddleware);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use("/", indexRouter)
app.use("/courses", coursesRouter);
app.use("/add", addRouter);
app.use("/card", cardRouter);
app.use('/orders', ordersRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// async function start() {
//   const candidate =  User.findOne();
//   if (!candidate) {
//     const user = new User({
//       email: "alisobirzanov29@gmail.com",
//       name: "ali",
//       cart: { item: [] },
//     });
//     await user.save();
//   }

//   app.listen(PORT, () => {
//     console.log("Server is running on port", PORT);
//   });
// }

// start();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
