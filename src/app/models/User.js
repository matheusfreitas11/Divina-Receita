const db = require("../../config/db");
const Base = require("./Base");

Base.init({ table: "users" });

module.exports = {
  ...Base,
  async Reports() {
    try {
      const results = await db.query(`select count(name)::int, date_part('month',created_at) as month
      from users
      where created_at between '2020-01-01 00:00:00' and CURRENT_TIMESTAMP
      group by month
      `);
     
      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
  async ReportsMensal() {
    try {
      const results = await db.query(`select count(name)::int, date_part('month',created_at) as month
      from users
      where created_at between '2020-06-01 00:00:00' and CURRENT_TIMESTAMP
      group by month
      `);
     
      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
};
