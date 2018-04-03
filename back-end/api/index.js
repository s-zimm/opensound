const Router = require('koa-router');
const api = new Router();
const users = require('./users');
const sounds = require('./sounds');

api.use('/users', users.routes());
api.use('/sounds', sounds.routes());

module.exports = api;