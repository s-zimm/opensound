const Router = require('koa-router');
const api = new Router({ prefix: '/api' });
const datastore = require('./datastore');

api.post('/users', async (ctx, next) => {
  let obj = ctx.request.body;
  ctx.body = await datastore.users.create(obj)
    .catch(err => Promise.resolve(err.detail));
});

api.get('/users/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await datastore.users.read(id);

  if (!result.length) {
    ctx.body = `User ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

api.get('/users', async (ctx, next) => {
  ctx.body = await datastore.users.readAll();
});

api.put('/users/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let updates = ctx.request.body;
  var result = await datastore.users.update(id, updates);

  if (!result.length) {
    ctx.body = `User ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

api.del('/users/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await datastore.users.del(id);

  if (!result.length) {
    ctx.body = `User ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

module.exports = api;