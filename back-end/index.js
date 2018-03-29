const Koa = require('koa');
const router = require('./router');
const fs = require('fs');
const zlib = require('zlib');
const parser = require('koa-body')();

let app = new Koa();

app.use(parser);

app.use(router.routes());

app.use(async ctx => {
  ctx.body = 'Hello world!';
});

app.listen(3000);