var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var moviesRouter = require("./routes/movies.routes.js");
var usersRouter = require("./routes/users.routes");
var favoriteMoviesRouter = require("./routes/favoriteMovies.routes");
var dateRouter = require("./routes/timeDateRoutes.routes");
var surasRouter = require("./routes/suras.routes.js");
var cuzlersRouter = require("./routes/cuzlers.routes.js");
var cenazeCuzlersRouter = require("./routes/cenazecuzlers.routes.js");
var fetihsRouter = require("./routes/fetihs.routes.js");
var yasinsRouter = require("./routes/yasins.routes.js");
var salavatRouter = require("./routes/salavatRoutes.js");
//middlewares
const verifyToken = require("./auth/verifyToken");
// const isAdmin = require('./auth/isAdmin');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//DB connection
require("./config/db.config")();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/", moviesRouter);
app.use("/", usersRouter);
app.use("/", favoriteMoviesRouter);
app.use("/", dateRouter);
app.use("/", surasRouter);
app.use("/", cuzlersRouter);
app.use("/", cenazeCuzlersRouter);
app.use("/", fetihsRouter);
app.use("/", yasinsRouter);
app.use("/", salavatRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
