const Service = require('feathers-sequelize');
const Model = require('../../models/bird.model');
const hooks = require('./birds.hooks');

module.exports = function (app) {
  const model = Model(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'birds',
    Model: model,
    paginate
  };

  app.use('/birds', Service(options));

  const service = app.service('birds');

  service.hooks(hooks);
};
