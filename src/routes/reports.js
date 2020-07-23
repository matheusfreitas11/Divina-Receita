const express = require("express");
const routes = express.Router();


const reports = require("../app/controllers/ReportsController");

const { onlyUsers, posterAdmin } = require("../app/middlewares/session");

routes.get("/reports", onlyUsers, reports.index);
routes.get("/reports/contas", onlyUsers, reports.contas);
routes.get("/reports/receitas", onlyUsers, reports.recipes);
routes.get("/reports/pagamentos", onlyUsers, reports.pag);

module.exports = routes;
