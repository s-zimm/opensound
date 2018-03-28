require('dotenv').config({ path: '../.env'});
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const zlib = require('zlib');
const pg = require('pg-promise')();
const db = pg({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER
});

db.query('SELECT * FROM users').then(data => console.log(data));

var app = new Koa();
var router = new Router();

app.use(async res => {
  res.body = 'Hello world!';
});

app.listen(3000);