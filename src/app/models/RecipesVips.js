const db = require("../../config/db");

const Base = require("./Base");

Base.init({ table: "recipes" });

module.exports = {
  ...Base,
  async all() {
    const results = await db.query(
      `
      SELECT recipes.*, vips.apelido AS vip_apelido
      FROM recipes
      LEFT JOIN vips ON (recipes.vip_id = vips.id)
      ORDER BY updated_at DESC
      `
    );

    return results.rows;
  },
  async find(id) {
    try {
      const results = await db.query(
        `
        SELECT recipes.*, vips.apelido AS vip_apelido
        FROM recipes
        LEFT JOIN vips on (recipes.vip_id = vips.id)
        WHERE recipes.id = $1
        `,
        [id]
      );

      return results.rows[0];
    } catch (err) {
      console.error(err);
    }
  },
  async chefVipName() {
    try {
      const results = await db.query(`SELECT apelido, id FROM vips`);

      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
  async paginate(params) {
    try {
      const { filter, limit, offset, admin, userId } = params;
      let order = "ORDER BY created_at DESC";
      let filterQuery = "";
      if (filter) {
        filterQuery = `WHERE recipes.title ILIKE '%${filter}%'`;
        order = "ORDER BY updated_at DESC";
      }

      if (!admin) {
        if (filter)
          filterQuery = `${filterQuery} AND recipes.user_id = ${userId}`;
        else filterQuery = `WHERE recipes.user_id = ${userId}`;
      }

      const totalQuery = `(
        SELECT count(*)
        FROM recipes
        ${filterQuery}
      ) as total`;

      const query = `SELECT recipes.*, ${totalQuery}, vips.apelido as vip_apelido
      FROM recipes
      LEFT JOIN vips ON (recipes.vip_id = vips.id)
      ${filterQuery}
      ${order} LIMIT ${limit} OFFSET ${offset}`;

      const results = await db.query(query);
      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
  async files(id) {
    try {
      const results = await db.query(
        `
      SELECT files.*, recipe_files.recipe_id as recipe_id
      FROM files 
      LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
      WHERE recipe_files.recipe_id = $1`,
        [id]
      );

      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
};
