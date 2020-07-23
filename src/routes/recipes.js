const express = require("express");
const routes = express.Router();
const multer = require("../app/middlewares/multer");
const recipe = require("../app/controllers/RecipeController");
const recipeVip = require("../app/controllers/RecipesVipsController");
const { onlyUsers, posterAdmin } = require("../app/middlewares/session");
const Validator = require("../app/validators/fields");


routes.get("/recipes", onlyUsers, recipe.index);
routes.get("/recipes/create", onlyUsers, recipe.create);
routes.get("/recipes/:id", onlyUsers, recipe.show);
routes.get("/recipes/:id/edit", posterAdmin, recipe.edit);
routes.post("/recipes", multer.array("images", 5), Validator.post, recipe.post);
routes.put("/recipes", multer.array("images", 5), posterAdmin, Validator.put, recipe.put);
routes.delete("/recipes", posterAdmin, recipe.delete);

routes.get("/recipesVips", onlyUsers, recipeVip.index);
routes.get("/recipesVips/create", onlyUsers, recipeVip.create);
routes.get("/recipesVips/:id", onlyUsers, recipeVip.show);
routes.get("/recipesVips/:id/edit", posterAdmin, recipeVip.edit);
routes.post("/recipesVips", multer.array("images", 5), Validator.post, recipeVip.post);
routes.put("/recipesVips", multer.array("images", 5), posterAdmin, Validator.put, recipeVip.put);
routes.delete("/recipesVips", posterAdmin, recipeVip.delete);

module.exports = routes;
