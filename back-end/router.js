const Router = require('koa-router');
const router = new Router();
const datastore = require('./datastore');

router.get('/api/users', async (ctx, next) => {
  ctx.body = await datastore.users.getAll();
});

router.post('/api/users', async (ctx, next) => {
  let obj = ctx.request.body;
  ctx.body = await datastore.users.create(obj)
    .catch(err => Promise.resolve(err.detail));
});

router.get('/api/users/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await datastore.users.get(id);

  if (!result.length) {
    ctx.body = `User ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

module.exports = router;