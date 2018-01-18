const Sequelize = require('sequelize');
const Bird = require('./bird.model');

module.exports = function(app) {
  const sequelize = app.get('sequelize');
  const sightings = sequelize.define('sightlings', {
    bird_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      reference: {
        model: Bird,
        key: 'id',
      }
    },
    time: {
      type: Sequelize.DATE
    },
    location: {
      type: Sequelize.STRING
    }
  }, {
    classMethods: {}
  });

  return sightings;
};
