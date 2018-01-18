const Sequelize = require('sequelize');

module.exports = function(app) {
  const sequelize = app.get('sequelize');
  const birds = sequelize.define('birds', {
    name: {
      type: Sequelize.STRING
    },
    size: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    weight: {
      type: Sequelize.FLOAT
    }
  }, {
    classMethods: {}
  });

  return birds;
};
