const { hash } = require("bcryptjs");
const { date } = require("../../lib/utils");
const Mail = require("../../lib/email");
const User = require("../models/User");
const { formatCpfCnpj  } = require("../../lib/cpf");

module.exports = {
  registerForm(req, res) {
    return res.render("admin/profile/register");
  },
        async show(req, res) {
          try {
            const { user } = req;
            user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
        
            return res.render("admin/profile/index", { user });
          } catch (err) {
            console.error(err);
          }
        },
  async post(req, res) {
    try {
      let { name, email, password,telefone,cpf_cnpj, admin = false } = req.body;

      const passwordHash = await hash(password, 8);

      cpf_cnpj = cpf_cnpj.replace(/\D/g, "");

      const userId = await User.create({
        name,
        email,
        telefone,
        cpf_cnpj,
        password: passwordHash,
        is_admin: admin,
        created_at: date(Date.now()).iso
      });

      const user = await User.findOne({ where: { id: userId } });

      req.session.userId = user.id;
      req.session.admin = user.is_admin;

      await Mail.sendMail({
        from: 'Divina Receita <divinareceita@hotmail.com>',
        to:`${name} <${email}>`,
        subject: 'Seja bem-vindo ao Divina Receita',
        html: ` 
                <h1>Divina Receita</h1>
                <br>
                <p>Seja um Chef Premium por apenas 20 reais e cadastre suas receitas a hora que quiser durante 1 ano! </p>
                <br> 
                <p>Login:${email}</p>
                <p>Senha:${password}</p>
                <br> 
                <p>Telefone de contato: (21)97013-4430 && (21)2413-9463.Respondemos via whatssap</p>
                 <p>
                  Horário de funcionamento: Segunda à Sábado de 09:00hrs às 18:00hrs.
                 </p>


        `
      })

      return res.redirect("/admin/profile");
    } catch (err) {
      console.error(err);
    }
  },


  async put(req, res) {
    try {
      let { name, email,telefone,cpf_cnpj } = req.body;
      const { user } = req;
      cpf_cnpj = cpf_cnpj.replace(/\D/g, "");

      await User.update(user.id, { name, email,telefone,cpf_cnpj });

      return res.render("admin/profile/index", {
        user: req.body,
        success: "Conta atualizada com sucesso"
      });
    } catch (err) {
      console.error(err);
      return res.render("admin/profile/index", {
        user: req.body,
        error: "Algo de errado ocorreu, por favor tente novamente"
      });
    }
  }
};
