const db = require("../../config/db");
const Base = require("./Base");

Base.init({ table: "vips" });

module.exports = {
  ...Base,
  async all() {
    try {
      const results = await db.query(
        `
      SELECT vips.*, count(recipes) AS total_recipes
      FROM vips
      LEFT JOIN recipes ON (vips.id = recipes.vip_id)
      GROUP BY vips.id
      ORDER BY total_recipes DESC
      `
      );
      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
  async find(id) {
    try {
      const results = await db.query(
        `
        SELECT vips.*, count(recipes) AS total_recipes
        FROM vips
        LEFT JOIN recipes ON (vips.id = recipes.vip_id)
        WHERE vips.id = $1
        GROUP BY vips.id
        ORDER BY total_recipes DESC
        `,
        [id]
      );

      return results.rows[0];
    } catch (err) {
      console.error(err);
    }
  },
  async recipes() {
    try {
      const results = await db.query(`
      SELECT id, vip_id, title
      FROM recipes
      ORDER BY created_at DESC`);

      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
  async files(id) {
    const results = await db.query(
      `
    SELECT * FROM files
    LEFT JOIN vips ON (files.id = vips.file_id)
    WHERE vips.id = $1`,
      [id]
    );
    return results.rows;
  },
  async Reports() {
    try {
      const results = await db.query(`select count(apelido)::int, date_part('month',created_at) as month
      from vips
      where created_at between '2020-01-01 00:00:00' and CURRENT_TIMESTAMP
      group by month
      `);
      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
};
