const users = require('./users/users.service.js');
const apiStuff = require('./api/stuff/stuff.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(apiStuff);
};
