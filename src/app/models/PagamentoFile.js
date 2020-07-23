const db = require("../../config/db");

const Base = require("./Base");

Base.init({ table: "pedido_files" });

module.exports = {
  ...Base,
  async files(id) {
    try {
      const results = await db.query(
        `
      SELECT files.*, pedido_files.pedido_id as pedido_id
      FROM files 
      LEFT JOIN pedido_files ON (files.id = pedido_files.file_id)
      WHERE pedido_files.pedido_id = $1`,
        [id]
      );

      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
};
