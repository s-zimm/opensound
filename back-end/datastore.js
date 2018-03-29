require('dotenv').config({ path: '../.env'});

const { pick } = require('lodash');
const pg = require('pg-promise')();
const db = pg({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER
});

const datastore = (table, attributes) => {
  let create = (obj) => {
    let user = pick(obj, attributes);
    return user;
  };

  let getAll = () => {
    return db.query(`SELECT * FROM ${table}`)
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