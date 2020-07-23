const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const methodOverride = require("method-override");
const session = require("./config/session");
const bodyParser = require("body-parser");

const server = express();

server.use(session);
server.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(routes);
server.set("view engine", "njk");

nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true
});

server.use(function(req, res) {
  res.status(404).render("./not-found");
});

server.listen(5000, function() {
  console.log("Server is running!");
});
