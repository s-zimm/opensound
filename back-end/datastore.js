require('dotenv').config({ path: '../.env'});

const { pick } = require('lodash');
const pg = require('pg-promise')();
const db = pg({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER
});

let sequelize = (obj) => {
  let entries = Object.entries(obj);
  let columns = entries.map((el) => el[0]).join(',');
  let values = entries.map((el) => `'${el[1]}'`).join(',');

  return {
    columns, values
  }
}

const datastore = (table, attributes) => {
  let create = (obj) => {
    let user = pick(obj, attributes);
    let {columns, values} = sequelize(user);

    return db.query(`INSERT INTO users (${columns}) VALUES (${values}) RETURNING *`);
  };

  let getAll = () => {
    return db.query(`SELECT * FROM ${table}`);
  };

  let get = (id) => {
    return db.query(
      `
      SELECT * FROM ${table}
      WHERE id = '${id}'
      `
    );
  };

  return {
    create,
    getAll,
    get
  }
}

let users = datastore('users',['username','email','first_name','last_name']);

module.exports = {
  users
};