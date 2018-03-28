const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const zlib = require('zlib');
const pg = require('pg-promise')();
const env = require('../config');
const db = pg(`postgres://${env.user}@localhost:5432/${env.db}`);

var app = new Koa();
var router = new Router();

app.use(async res => {
  res.body = 'Hello world!';
});

app.listen(3000);