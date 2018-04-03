const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const api = require('./api');
const fs = require('fs');
const zlib = require('zlib');
const parser = require('koa-body')();

let app = new Koa();
let router = new Router();
router.use('/api', api.routes());

app.use(parser);

app.use(serve('../front-end/build'));

app.use(router.routes());

app.use(async ctx => {
  ctx.body = '404 nothing here!';
});

app.listen(3000);