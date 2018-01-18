const Sequelize = require('sequelize');

const users = require('./users/users.service.js');
const birds = require('./birds/birds.service.js');
const sightings = require('./sightings/sightings.service.js');

module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('mysql'), {
    dialect: 'mysql',
    logging: false, // console.log,
  });
  app.set('sequelize', sequelize);

  app.configure(users);
  app.configure(birds);
  app.configure(sightings);

  // Setup relationships
  const models = sequelize.models;
  // Object.values(models)
  Object.keys(models).map(k => models[k])
    .filter(model => model.associate)
    .forEach(model => model.associate(models));

  sequelize.sync();
};
