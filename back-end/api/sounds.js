const Router = require('koa-router');
const soundRouter = new Router();
const sounds = require('./datastore').sounds;

soundRouter.post('/', async (ctx, next) => {
  let { user_id:userId, title, file } = ctx.request.body;

  ctx.body = `User ${user_id} posted a new sound called '${title}'.`;
});

soundRouter.get('/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await sounds.read(id);

  if (!result.length) {
    ctx.body = `Sound ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

soundRouter.del('/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await sounds.del(id);

  if (!result.length) {
    ctx.body = `Sound ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

module.exports = soundRouter;