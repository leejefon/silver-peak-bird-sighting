const Sequelize = require('sequelize');
const Bird = require('./bird.model');

module.exports = function(app) {
  const sequelize = app.get('sequelize');
  const sightings = sequelize.define('sightings', {
    bird_id: {
      type: Sequelize.INTEGER,
      reference: {
        model: Bird,
        key: 'id',
      }
    },
    datetime: {
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
