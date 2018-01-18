const Service = require('feathers-sequelize');
const Model = require('../../models/sighting.model');
const hooks = require('./sightings.hooks');

module.exports = function (app) {
  const model = Model(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'sightings',
    Model: model,
    paginate
  };

  app.use('/sightings', Service(options));

  const service = app.service('sightings');

  service.hooks(hooks);
};
