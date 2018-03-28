const Koa = require('koa');
const Router = require('koa-router');

var app = new Koa();
var router = new Router();

app.use(async res => {
  res.body = 'Hello world!';
});

app.listen(3000);