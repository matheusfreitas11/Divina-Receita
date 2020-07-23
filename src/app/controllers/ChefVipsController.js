const { date } = require("../../lib/utils");

const Vips = require("../models/Vips");
const VipsService = require("../services/VipsService");

const File = require("../models/File");
const DeleteService = require("../services/DeleteService");

module.exports = {
    async index(req, res) {
      try {
        const vips = await VipsService.load("vips");

        return res.render("admin/chefVips/index", { vips });
      } catch (err) {
        console.error(err);
      }
    },
    create(req, res) {
      return res.render("admin/chefVips/create");
    },
    async post(req, res) {
      
      try {
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
          })
        );

  
  
        await Promise.all(relationPromise);
  
        return res.render("admin/parts/success", {
          type: "Chef Premium",
          action: "cadastrado",
        });
      } catch (err) {
        console.error(err);
      }
    },
    async show(req, res) {
      try {
        let vip = await VipsService.load("vip", req.params.id);
        if (!vip) return res.send("Chef Premium não encontrado");
  
        let image = await Vips.files(vip.id);
        if (image[0]) image.src = image[0].path.replace("public", "");
  
        const recipes = await VipsService.load("recipes");
  
        return res.render("admin/chefVips/show", { vip, image, recipes });
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
  
        return res.render("admin/chefVips/edit", { vip, files });
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
        type: "Chef Premium",
        action: "atualizado",
      });
    },
    async delete(req, res) {
      try {
        let vip = await VipsService.load("vip", req.body.id);
        if (vip.total_recipes > 0)
          return res.render("admin/parts/error", {
            type: "Somente Chefs Vips sem receitas podem ser deletados!",
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
  