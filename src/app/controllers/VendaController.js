const { date } = require("../../lib/utils");
const VipsService = require("../services/VipsService");
const Mail = require("../../lib/email");
const Vips = require("../models/Vips");
const File = require("../models/File");
const DeleteService = require("../services/DeleteService");

module.exports = {
    async index(req, res) {
      try {

        
        return res.render("admin/vips/index");
      } catch (err) {
        console.error(err);
      }
    },
    create(req, res) {
      return res.render("admin/vips/create");
    },
    async post(req, res) {
      try {
        let {apelido, email} = req.body;
        const filePromise = req.files.map((file) =>
          File.create({
            name: file.filename,
            path: file.path,
          
          })
        );
  
        const filesId = await Promise.all(filePromise);
        const relationPromise = filesId.map((fileId) =>
          Vips.create({
            ...req.body,
            created_at: date(Date.now()).iso,
            file_id: fileId,
            apelido: apelido,
            email: email
          })
        );
           await Mail.sendMail({
              from: 'Divina Receita <divinareceita@hotmail.com>',
              to:`${apelido} <${email}>`,
              subject: 'Dados bancários:',
              html: `
                <h1>Dados para tranferência:</h1> 
                <br>
                <p>Nome: Divina Receitas LTDA
                <p>Banco: Bradesco</p>
                <p>Agencia: 4080 </p>
                <p>Conta: 0539004 </p>
                <p>Tipo: Conta Corrente </p>
                <p>Cpnj: 84.022.744/0001-05 </p>
                <p>Valor a transferir: 20,00</p>
                <br>
                <p>Telefone de contato: (21) 97013-4430 && (21) 2413-9463.Respondemos via whatssap</p>
                 <p>
                 Horário de funcionamento: Segunda à Sábado de 09:00hrs às 18:00hrs.
                 </p>

              
              `
            })
  
        await Promise.all(relationPromise);
        return res.render("admin/parts/success", {
          type: "Verifique seu e-mail!",
          action: "Dados para transação enviado",
        });
      } catch (err) {
        console.error(err);
      }
    },
    async show(req, res) {
      try {
        let vip = await VipsService.load("vip", req.params.id);
        if (!vip) return res.send("Chef Vip não encontrado");
  
        let image = await Vips.files(vip.id);
        if (image[0]) image.src = image[0].path.replace("public", "");
  
        const recipes = await VipsService.load("recipes");
  
        return res.render("admin/vips/show", { vip, image, recipes });
      } catch (err) {
        console.error(err);
      }
    },
    async edit(req, res) {
      try {
        let vip = await Vips.find(req.params.id);
  
        if (!vip) return res.send("Chef vip não encontrado");
  
        let files = await Vips.files(vip.id);
        files = files.map((file) => ({
          ...file,
          src: files[0].path.replace("public", ""),
        }));
  
        return res.render("admin/vips/edit", { vip, files });
      } catch (err) {
        console.error(err);
      }
    },
    async put(req, res) {
      let { apelido, facebook, instagram, email,about_you, anos_exp } = req.body;
  
      if (req.files.length != 0) {
        const file = req.files[0];
        let fileId = await File.create({ name: file.filename, path: file.path });
  
        await Vips.update(req.body.id, {
          apelido, 
          facebook, 
          instagram,
          email,
          about_you,
          anos_exp,
          file_id: fileId,
        });
      } else {
        if (req.body.removed_files != "" && req.files[0] == undefined)
          return res.render("admin/parts/error", {
            type: "Ao menos uma imagem deve ser enviada!",
          });
      }
  
      if (req.body.removed_files) {
        DeleteService.removedFiles(req.body);
      }
  
      await Vips.update(req.body.id, {
        apelido, 
        facebook, 
        instagram,
        email,
        about_you,
        anos_exp
      });
  
      return res.render("admin/parts/success", {
        type: "Chef Vip",
        action: "atualizado",
      });
    },
    async delete(req, res) {
      try {
        let vip = await VipsService.load("vip", req.body.id);
        if (vip.total_recipes > 0)
          return res.render("admin/parts/error", {
            type: "Somente Chefs Premium sem receitas podem ser deletados!",
          });
  
        const files = await Vips.files(req.body.id);
  
        await Vips.delete(req.body.id);
  
        DeleteService.deleteFiles(files);
  
        return res.render("admin/parts/success", {
          type: "Chef Premium",
          action: "deletado",
        });
      } catch (err) {
        console.error(err);
      }
    },
  };
  