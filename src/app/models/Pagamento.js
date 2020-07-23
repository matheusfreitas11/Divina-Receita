const db = require("../../config/db");

const Base = require("./Base");

Base.init({ table: "pedido_vip" });

module.exports = {
  ...Base,
  async all() {
    const results = await db.query(
      `
      SELECT pedido_vip.*, vips.apelido AS vip_apelido
      FROM pedido_vip
      LEFT JOIN vips ON (pedido_vip.vip_id = vips.id)
      ORDER BY updated_at DESC
      `
    );

    return results.rows;
  },
  async find(id) {
    try {
      const results = await db.query(
        `
        SELECT pedido_vip.*, vips.apelido AS vip_apelido
        FROM pedido_vip
        LEFT JOIN vips ON (pedido_vip.vip_id = vips.id)
        WHERE pedido_vip.id = $1
        `,
        [id]
      );

      return results.rows[0];
    } catch (err) {
      console.error(err);
    }
  },
  async vipName() {
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
        filterQuery = `WHERE pedido_vip.valor ILIKE '%${filter}%'`;
        order = "ORDER BY updated_at DESC";
      }

      if (!admin) {
        if (filter)
          filterQuery = `${filterQuery} AND pedido_vip.user_id = ${userId}`;
        else filterQuery = `WHERE pedido_vip.user_id = ${userId}`;
      }

      const totalQuery = `(
        SELECT count(*)
        FROM pedido_vip
        ${filterQuery}
      ) as total`;

      const query = `SELECT pedido_vip.*, ${totalQuery},vips.apelido as vip_apelido
      FROM pedido_vip
      LEFT JOIN vips ON (pedido_vip.vip_id = vips.id)
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
  async Reports() {
    try {
      const results = await db.query(`select count(valor)::integer, date_part('month',created_at) as month
      from pedido_vip
      where created_at between '2020-01-01 00:00:00' and CURRENT_TIMESTAMP
      group by month
      `);
    
      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
};
