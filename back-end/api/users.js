const Router = require('koa-router');
const userRouter = new Router();
const users = require('./datastore').users;

userRouter.post('/', async (ctx, next) => {
  let obj = ctx.request.body;
  ctx.body = await users.create(obj)
    .catch(err => Promise.resolve(err.detail));
});

userRouter.get('/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await users.read(id);

  if (!result.length) {
    ctx.body = `User ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

userRouter.get('/', async (ctx, next) => {
  ctx.body = await users.readAll();
});

userRouter.put('/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let updates = ctx.request.body;
  var result = await users.update(id, updates);

  if (!result.length) {
    ctx.body = `User ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

userRouter.del('/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await users.del(id);

  if (!result.length) {
    ctx.body = `User ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

module.exports = userRouter;