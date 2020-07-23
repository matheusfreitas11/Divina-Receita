const express = require("express");
const routes = express.Router();
const multer = require("../app/middlewares/multer");

const suporte = require("../app/controllers/SuporteController")
const { onlyUsers } = require("../app/middlewares/session");

const Validator = require("../app/validators/fields");


routes.get("/suporte", onlyUsers, suporte.index);
routes.get("/suporte/create", onlyUsers, suporte.create);
routes.post("/suporte", multer.array("images", 5), Validator.post,  suporte.post);

module.exports = routes;
