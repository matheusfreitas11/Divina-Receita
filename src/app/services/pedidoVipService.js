const Pedido = require("../models/Pagamento");

async function getImages(pedidoId) {
  let files = await Pedido.files(pedidoId);
  files = files.map((file) => ({
    ...file,
    src: `${file.path.replace("public", "")}`,
  }));

  return files;
}

async function format(pedido) {
  const files = await getImages(pedido.id);
  pedido.img = files[0].src;
  pedido.images = files;

  return pedido;
}

const LoadService = {
  load(service, filter) {
    this.filter = filter;
    return this[service]();
  },
  async pedido() {
    try {
      const pedido = await Pedido.find(this.filter);
      return format(pedido);
    } catch (err) {
      console.error(err);
    }
  },
  async pedidos() {
    const pedidos = await Pedido.all(this.filter);
    const pedidosPromise = pedidos.map(format);
    return Promise.all(pedidosPromise);
  },
  format,
};

module.exports = LoadService;
