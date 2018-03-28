const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const zlib = require('zlib');
const pg = require('pg-promise')();
const env = require('dotenv');

var app = new Koa();
var router = new Router();

app.use(async res => {
  res.body = 'Hello world!';
});

app.listen(3000);