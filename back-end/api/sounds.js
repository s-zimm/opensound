const Router = require('koa-router');
const soundRouter = new Router();
const sounds = require('./datastore').sounds;
const fs = require('fs');
const promisify = require('util').promisify;
const unlink = promisify(fs.unlink);
const { UPLOAD_DIR } = process.env;

soundRouter.post('/', async (ctx, next) => {
  let { userId:user_id, title, audioBlob:file_path } = ctx.request.body;
  let result = await sounds.create({ user_id, title, file_path });

  ctx.body = result;
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

  let { file_path } = result;

  console.log(`${UPLOAD_DIR}/${file_path}`);

  await unlink(`${UPLOAD_DIR}/${file_path}`);

  ctx.body = result;
});

module.exports = soundRouter;