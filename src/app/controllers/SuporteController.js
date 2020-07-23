const { date } = require("../../lib/utils");
const File = require("../models/File");
const Ouvidoria = require("../models/Ouvidoria");
const OuvidoriaFile = require("../models/OuvidoriaFile");
const Mail = require("../../lib/email");

const OuvidoriaService = require("../services/OuvidoriaService");
const DeleteService = require("../services/DeleteService");


module.exports = {
  async index(req, res) {
    try {
      let { page, limit } = req.query;
      page = page || 1;
      limit = limit || 6;
      let offset = limit * (page - 1);

      let { admin, userId } = req.session;
      if (!admin) admin = false;

      const params = {
        page,
        limit,
        offset,
        admin,
        userId,
      };

      let ouvidorias = await Ouvidoria.paginate(params);

      if (ouvidorias[0] == undefined) {
        return res.render("admin/suporte/index");
      }

      const  ouvidoriasPromise = ouvidorias.map(async (pedido) => {
        const files = await OuvidoriaFile.files(pedido.id);
        if (files[0]) pedido.img = files[0].path.replace("public", "");
      });


      
      await Promise.all(ouvidoriasPromise);

      const pagination = {
        total: Math.ceil(ouvidorias[0].total / limit),
        page,
      };

      return res.render("admin/suporte/index", {
        ouvidorias,
        pagination,
      });
    } catch (err) {
      console.error(err);
    }
  },
  async create(req, res) {
    try {
      const assuntos = await Ouvidoria.assuntoName();

      return res.render("admin/suporte/create", { assuntos });
    } catch (err) {
      console.error(err);
    }
  },
  async post(req, res) {
    try {
      let { nota, elogio, exp_site,assunto} = req.body;

      const ouvidoriaId = await Ouvidoria.create({
        created_at: date(Date.now()).iso,
        assunto_id: assunto,
        user_id: req.session.userId,
        nota,
        elogio,
        exp_site
        
      });

      const filesPromise = req.files.map((file) =>
        File.create({ name: file.filename, path: file.path })
      );
      const filesId = await Promise.all(filesPromise);
    

      const relationPromise = filesId.map((fileId) =>
          OuvidoriaFile.create({
          ouvidoria_id: ouvidoriaId,
          file_id: fileId,
        })
      );

     
      await Mail.sendMail({
        from: ``,
        to:`<divinareceita@hotmail.com>>`,
        subject: 'Ouvidoria',
        html: `
        <h1>Assuntos: 1 para Erros - 2 para Reclamação - 3 para Pagamento </h1>
          
        <br>

          <h1>Assunto: ${assunto}</h1> 
          <p>Experiência no site:  ${exp_site}</p>
          <p>Nota: ${nota} </p>
          <p>Recado:${elogio}</p>
       
      
        
        `
      })


      await Promise.all(relationPromise);

      return res.render("admin/parts/success", {
        type: "Sua mensagem foi enviada,",
        action: "",
      });
    } catch (err) {
      console.error(err);
    }
  },
  async show(req, res) {
    try {
      const pedido = await OuvidoriaService.load("pedido", req.params.id);
      if (!pedido) return res.send("pedido não encontrada");

      return res.render("admin/pagamento/show", { pedido });
    } catch (err) {
      console.error(err);
    }
  },
  async edit(req, res) {
    try {
      const pedido = await OuvidoriaService.load("pedido", req.params.id);
      if (!pedido) return res.send("Comprovante não encontrado");

      const vips = await Ouvidoria.vipName();

      return res.render("admin/pagamento/edit", { pedido, vips });
    } catch (err) {
      console.error(err);
    }
  },
  async put(req, res) {
    try {
      let { vip,valor } = req.body;

      if (req.files.length != 0) {
        const newFilesPromise = req.files.map((file) =>
          File.create({ name: file.filename, path: file.path })
        );
        const filesId = await Promise.all(newFilesPromise);

        const relationPromise = filesId.map((fileId) =>
          OuvidoriaFile.create({
            pedido_id: req.body.id,
            file_id: fileId
         
          })
        );

        await Promise.all(relationPromise);
      }

      if (req.body.removed_files) {
        DeleteService.removedFiles(req.body);
      }

      await Ouvidoria.update(req.body.id, {
        vip_id: vip,
        valor
      });

      return res.render("admin/parts/success", {
        type: "Comprovante",
        action: "corrigido",
      });
    } catch (err) {
      console.error(err);
    }
  },
  async delete(req, res) {
    try {
      const files = await Ouvidoria.files(req.body.id);

      await Ouvidoria.delete(req.body.id);

      DeleteService.deleteFiles(files);

      return res.render("admin/parts/success", {
        type: "Comprovante",
        action: "deletado",
      });
    } catch (err) {
      console.error(err);
    }
  },
};
