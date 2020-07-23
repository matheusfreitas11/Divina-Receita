const Vips = require("../models/Vips");
const Recipe = require("../models/Recipe");


async function getImages(vipId) {
    let files = await Vips.files(vipId);
    files = files.map((file) => ({
      ...file,
      src: `${file.path.replace("public", "")}`,
    }));
  
    return files;
  }

  
async function format(vip) {
    const files = await getImages(vip.id);
    vip.img = files[0].src;
    vip.images = files;
  
    return vip;
  }
  

  
const LoadService = {
    load(service, filter) {
      this.filter = filter;
      return this[service]();
    },
    async vip() {
      try {
        const vip = await Vips.find(this.filter);
  
        return format(vip);
      } catch (err) {
        console.error(err);
      }
    },
    async vips() {
      const vips = await Vips.all(this.filter);
      const vipsPromise = vips.map(format);
      return Promise.all(vipsPromise);
    },
    async recipes() {
      const recipes = await Vips.recipes();
  
      const itemsPromise = recipes.map(async (recipe) => {
        const files = await Recipe.files(recipe.id);
        if (files[0]) recipe.src = files[0].path.replace("public", "");
      });
  
      await Promise.all(itemsPromise);
      return recipes;
    },
    format,
  };
  
  module.exports = LoadService;
  