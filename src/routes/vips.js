const express = require("express");
const routes = express.Router();

const multer = require("../app/middlewares/multer");

const vips = require("../app/controllers/VendaController")
const ChefVips = require("../app/controllers/ChefVipsController")


const { onlyAdmin, onlyUsers } = require("../app/middlewares/session");

const Validator = require("../app/validators/fields");

routes.get("/vips", onlyUsers, vips.index);
routes.get("/vips/create", onlyUsers, vips.create);
routes.post("/vips", multer.array("images", 1), Validator.post, vips.post);
routes.get("/vips/:id", onlyUsers, vips.show);
routes.get("/vips/:id/edit", onlyAdmin, vips.edit);
routes.put("/vips", multer.array("images", 1), onlyAdmin, Validator.put, vips.put);
routes.delete("/vips", onlyAdmin, vips.delete);


routes.get("/chefVips", onlyUsers, ChefVips.index);
routes.get("/chefVips/create", onlyUsers, ChefVips.create);
routes.get("/chefVips/:id", onlyUsers, ChefVips.show);
routes.get("/chefVips/:id/edit", onlyAdmin, ChefVips.edit);
routes.post("/chefVips", multer.array("images", 1), Validator.post, ChefVips.post);
routes.put("/chefVips", multer.array("images", 1), onlyAdmin, Validator.put, ChefVips.put);
routes.delete("/chefVips", onlyAdmin, ChefVips.delete);





module.exports = routes;