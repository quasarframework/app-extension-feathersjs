// Initializes the `api/stuff` service on path `/api/stuff`
const createService = require('feathers-memory');
const hooks = require('./stuff.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/stuff', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/stuff');

  service.hooks(hooks);
};
