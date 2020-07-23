const db = require("../../config/db");

const Base = require("./Base");

Base.init({ table: "ouvidoria_files" });

module.exports = {
  ...Base,
  async files(id) {
    try {
      const results = await db.query(
        `
      SELECT files.*, ouvidoria_files.ouvidoria_id as ouvidoria_id
      FROM files 
      LEFT JOIN ouvidoria_files ON (files.id = ouvidoria_files.file_id)
      WHERE ouvidoria_files.ouvidoria_id = $1`,
        [id]
      );

      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
};
