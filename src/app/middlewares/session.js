const Recipe = require("../models/Recipe");
const Pedido = require("../models/Pagamento");

module.exports = {
  onlyUsers(req, res, next) {
    if (!req.session.userId) return res.redirect("/admin/login");

    next();
  },
  onlyAdmin(req, res, next) {
    if (!req.session.userId) return res.redirect("/admin/login");

    if (req.session.userId && req.session.admin == false) {
      return res.redirect("/admin/profile");
    }

    next();
  },
  async posterAdmin(req, res, next) {
    if (!req.session.userId) return res.redirect("/admin/login");

    let id = req.params.id;
    if (!id) id = req.body.id;

    const recipe = await Recipe.find(id);
    user = recipe.user_id;
    
    if (
      req.session.userId &&
      user != req.session.userId &&
      req.session.admin == false
    )
      return res.redirect(`/admin/recipes/${id}`);

    next();
  },
  
    onlyVips(req, res, next) {
      if (!req.session.userId) return res.redirect("/admin/login");
  
      if (req.session.userId && req.session.vips == false) {
        return res.redirect("/admin/profile");
      }
  
      next();
  },
  
 async onlyPagamento(req, res, next) {
    if (!req.session.userId) return res.redirect("/admin/login");

    let id = req.params.id;
    if (!id) id = req.body.id;

    const pedido = await Pedido.find(id);
    user = pedido.user_id;
   

    if (
      req.session.userId &&
      user != req.session.userId &&
      req.session.admin == false
    )
      return res.redirect(`/admin/pagamento/${id}`);

    next();
}
};
