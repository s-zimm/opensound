const { pick } = require('lodash');
const pg = require('pg-promise')();
const { DB_HOST, DB_PORT, DB_NAME, DB_USER } = process.env;
const db = pg({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER
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

    return db.query(`
      INSERT INTO ${table} (${columns})
      VALUES (${values})
      RETURNING *
    `);
  };

  let read = (id) => {
    return db.query(`
      SELECT * FROM ${table}
      WHERE id = '${id}'
    `);
  };

  let readAll = () => {
    return db.query(`
      SELECT * FROM ${table}
    `);
  };

  let update = (id, obj) => {
    let updates = pick(obj, attributes);
    let {columns, values} = sequelize(updates);

    return db.query(`
      UPDATE ${table}
      SET (${columns}) = (${values})
      WHERE id = '${id}'
      RETURNING *
    `);
  };

  let del = (id) => {
    return db.query(`
      DELETE FROM ${table}
      WHERE id = '${id}'
      RETURNING *
    `);
  };

  return {
    create,
    read,
    readAll,
    update,
    del
  }
}

let users = datastore('users',['username','email','first_name','last_name']);
let sounds = datastore('sounds', ['user_id','title','file_path']);

module.exports = {
  users,
  sounds
};