const express = require("express");
const routes = express.Router();
const multer = require("../app/middlewares/multer");
const pagamento = require("../app/controllers/PagamentoController");
const { onlyPagamento, onlyUsers,posterAdmin } = require("../app/middlewares/session");
const Validator = require("../app/validators/fields");

routes.get("/pagamento", onlyUsers, pagamento.index);
routes.get("/pagamento/create", onlyUsers, pagamento.create);
routes.get("/pagamento/:id", onlyUsers, pagamento.show);
routes.get("/pagamento/:id/edit", onlyPagamento, pagamento.edit);
routes.post("/pagamento", multer.array("images", 5), Validator.post, pagamento.post);
routes.put("/pagamento", multer.array("images", 5), onlyPagamento, Validator.put, pagamento.put);
routes.delete("/pagamento", onlyPagamento, pagamento.delete);

module.exports = routes;

