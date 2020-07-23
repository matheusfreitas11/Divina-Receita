const { date } = require("../../lib/utils");
const File = require("../models/File");
const pedidoVip = require("../models/Pagamento");
const PedidoFile = require("../models/PagamentoFile");

const pedidoVipService = require("../services/pedidoVipService");
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

      let pedidos = await pedidoVip.paginate(params);

      if (pedidos[0] == undefined) {
        return res.render("admin/pagamento/index");
      }

      const pedidosPromise = pedidos.map(async (pedido) => {
        const files = await PedidoFile.files(pedido.id);
        if (files[0]) pedido.img = files[0].path.replace("public", "");
      });

      await Promise.all(pedidosPromise);

      const pagination = {
        total: Math.ceil(pedidos[0].total / limit),
        page,
      };

      return res.render("admin/pagamento/index", {
        pedidos,
        pagination,
      });
    } catch (err) {
      console.error(err);
    }
  },
  async create(req, res) {
    try {
      const vips = await pedidoVip.vipName();

      return res.render("admin/pagamento/create", { vips });
    } catch (err) {
      console.error(err);
    }
  },
  async post(req, res) {
    try {
      let { vip,valor} = req.body;

      const pedidoId = await pedidoVip.create({
        created_at: date(Date.now()).iso,
        vip_id: vip,
        user_id: req.session.userId,
        valor
      });

      const filesPromise = req.files.map((file) =>
        File.create({ name: file.filename, path: file.path })
      );
      const filesId = await Promise.all(filesPromise);

      const relationPromise = filesId.map((fileId) =>
          PedidoFile.create({
          pedido_id: pedidoId,
          file_id: fileId,
        })
      );

      await Promise.all(relationPromise);

      return res.render("admin/parts/success", {
        type: "Entrada do pagamento",
        action: "Computada",
      });
    } catch (err) {
      console.error(err);
    }
  },
  async show(req, res) {
    try {
      const pedido = await pedidoVipService.load("pedido", req.params.id);
      if (!pedido) return res.send("pedido não encontrada");

      return res.render("admin/pagamento/show", { pedido });
    } catch (err) {
      console.error(err);
    }
  },
  async edit(req, res) {
    try {
      const pedido = await pedidoVipService.load("pedido", req.params.id);
      if (!pedido) return res.send("Comprovante não encontrado");

      const vips = await pedidoVip.vipName();

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
          PedidoFile.create({
            pedido_id: req.body.id,
            file_id: fileId
         
          })
        );

        await Promise.all(relationPromise);
      }

      if (req.body.removed_files) {
        DeleteService.removedFiles(req.body);
      }

      await pedidoVip.update(req.body.id, {
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
      const files = await pedidoVip.files(req.body.id);

      await pedidoVip.delete(req.body.id);

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
