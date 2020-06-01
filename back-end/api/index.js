const Router = require('koa-router');
const api = new Router();
const users = require('./users');
const sounds = require('./sounds');
const tracks = require('./sounds');

api.use('/users', users.routes());
api.use('/sounds', sounds.routes());
api.use('/tracks', tracks.routes());

module.exports = api;