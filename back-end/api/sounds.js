const Router = require('koa-router');
const soundRouter = new Router();
const sounds = require('./datastore').sounds;

soundRouter.post('/', async (ctx, next) => {
  let obj = ctx.request.body;
  ctx.body = await sounds.create(obj)
    .catch(err => Promise.resolve(err.detail));
});

soundRouter.get('/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await sounds.read(id);

  if (!result.length) {
    ctx.body = `User ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

soundRouter.get('/', async (ctx, next) => {
  ctx.body = await sounds.readAll();
});

soundRouter.del('/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await sounds.del(id);

  if (!result.length) {
    ctx.body = `User ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

module.exports = soundRouter;