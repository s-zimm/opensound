const Koa = require('koa');
const Router = require('koa-router');
const mount = require('koa-mount');
const serve = require('koa-static');
const api = require('./api');
const fs = require('fs');
const convert = require('koa-convert');
const parser = require('koa-better-body');
const formidable = require('formidable');

let app = new Koa();
let router = new Router();

router.use('/api', api.routes());

var form = new formidable.IncomingForm({
  uploadDir: '../library',
  keepExtensions: true
});

app.use(convert(parser({
  multipart: true,
  fields: 'body',
  IncomingForm: form
})));

app.use(serve('../front-end/build'));

app.use(mount('/library', serve('../library')));

app.use(router.routes());

app.use(async ctx => {
  ctx.body = '404 nothing here!';
});

app.listen(3000);