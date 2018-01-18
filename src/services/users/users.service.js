// Initializes the `users` service on path `/users`
const Service = require('feathers-sequelize');
const Model = require('../../models/user.model');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const model = Model(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model: model,
    paginate
  };

  app.use('/users', Service(options));

  const service = app.service('users');

  service.hooks(hooks);
};
