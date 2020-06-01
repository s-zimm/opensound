const Router = require('koa-router');
const trackRouter = new Router().tracks;

trackRouter.post('/', async (ctx, next) => {
  let { userId:user_id, soundId:sound_id, title, audioBlob:file_path } = ctx.request.body;
  let result = await tracks.create({ user_id, sound_id, title, file_path });

  ctx.body = result;
});

trackRouter.get('/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await tracks.read(id);

  if (!result.length) {
    ctx.body = `Track ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

trackRouter.del('/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let result = await tracks.del(id);

  if (!result.length) {
    ctx.body = `Track ${id} does not exist.`;
    return;
  }

  ctx.body = result;
});

module.exports = trackRouter;