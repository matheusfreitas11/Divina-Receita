const db = require("../../config/db");

const Base = require("./Base");

Base.init({ table: "ouvidoria" });

module.exports = {
  ...Base,
  async all() {
    const results = await db.query(
      `
      SELECT ouvidoria.*, assunto.name AS assunto_name
      FROM ouvidoria
      LEFT JOIN assunto ON (ouvidoria.assunto_id = assunto.id)
      ORDER BY updated_at DESC
      `
    );

    return results.rows;
  },
  async find(id) {
    try {
      const results = await db.query(
        `
        SELECT ouvidoria.*, assunto.name AS assunto_name
        FROM ouvidoria
        LEFT JOIN assunto ON (ouvidoria.assunto_id = assunto.id)
        WHERE ouvidoria.id = $1
        `,
        [id]
      );

      return results.rows[0];
    } catch (err) {
      console.error(err);
    }
  },
  async assuntoName() {
    try {
      const results = await db.query(`SELECT name, id FROM assunto`);

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
        filterQuery = `WHERE ouvidoria.nota ILIKE '%${filter}%'`;
        order = "ORDER BY updated_at DESC";
      }

      if (!admin) {
        if (filter)
          filterQuery = `${filterQuery} AND ouvidoria.user_id = ${userId}`;
        else filterQuery = `WHERE ouvidoria.user_id = ${userId}`;
      }

      const totalQuery = `(
        SELECT count(*)
        FROM ouvidoria
        ${filterQuery}
      ) as total`;

      const query = `SELECT ouvidoria.*, ${totalQuery},assunto.name as assunto_name
      FROM ouvidoria
      LEFT JOIN assunto ON (ouvidoria.assunto_id = assunto.id)
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
  async Reports() {
    try {
      const results = await db.query(`select count(valor)::int, date_part('month',created_at) as month
      from ouvidoria
      where created_at between '2020-01-01 00:00:00' and CURRENT_TIMESTAMP
      group by month
      `);
    
      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
};
