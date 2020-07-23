const Vips = require("../models/Vips");
const Recipes = require("../models/Recipe");
const Users = require("../models/User");
const Pagamentos = require("../models/Pagamento");
const { recipes } = require("../models/Vips");

(module.exports = {
  async contas(req, res) {
    try {
      let data = await Vips.Reports(req.body);
      const premium = Array(12).fill(0);
      data.forEach((r) => premium[r.month-1] = r.count )

      data = await Users.Reports(req.body);
      const registers = Array(12).fill(0);
      data.forEach((r) => registers[r.month-1] = r.count )

      const render = res.render("admin/reports/contas", {
        premium: JSON.stringify(premium),
        registers: JSON.stringify(registers),
        
      });
      return render;
    } catch (err) {
      console.error(err);
    }
  },
  async recipes(req,res){
    try {
      let data = await Recipes.Reports(req.body);
      const recipes = Array(12).fill(0);
      data.forEach((r) => recipes[r.month-1] = r.count )

     
      const render = res.render("admin/reports/receitas", {
        recipes: JSON.stringify(recipes)
      });
      return render;
    } catch (err) {
      console.error(err);
    }
  },
  async index(req,res){
    return res.render("admin/reports/index");
  },
  async pag(req,res){
    try {
      let data = await Pagamentos.Reports(req.body);
      const pagamentos = Array(12).fill(0);
      data.forEach((r) => pagamentos[r.month-1] = r.count )

     
      const render = res.render("admin/reports/pagamentos", {
        pagamentos: JSON.stringify(pagamentos)
      });
      return render;
    } catch (err) {
      console.error(err);
    }
  },
  async vips(res,req){

  }
})