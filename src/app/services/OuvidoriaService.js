const Ouvidoria = require("../models/Ouvidoria");

async function getImages(ouvidoriaId) {
  let files = await Ouvidoria.files(ouvidoriaId);
  files = files.map((file) => ({
    ...file,
    src: `${file.path.replace("public", "")}`,
  }));

  return files;
}

async function format(ouvidoria) {
  const files = await getImages(ouvidoria.id);
  ouvidoria.img = files[0].src;
  ouvidoria.images = files;

  return ouvidoria;
}

const LoadService = {
  load(service, filter) {
    this.filter = filter;
    return this[service]();
  },
  async ouvidoria() {
    try {
      const ouvidoria = await Ouvidoria.find(this.filter);
      return format(ouvidoria);
    } catch (err) {
      console.error(err);
    }
  },
  async ouvidorias() {
    const ouvidorias = await Ouvidoria.all(this.filter);
    const ouvidoriasPromise = ouvidorias.map(format);
    return Promise.all(ouvidoriasPromise);
  },
  format,
};

module.exports = LoadService;
