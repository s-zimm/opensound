const Koa = require('koa');
const api = require('./api');
const fs = require('fs');
const zlib = require('zlib');
const parser = require('koa-body')();

let app = new Koa();

app.use(parser);

api.use('/api', api.routes());

app.use(api.routes());

app.use(async ctx => {
  ctx.body = 'Hello world!';
});

app.listen(3000);