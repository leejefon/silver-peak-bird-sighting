const Sequelize = require('sequelize');

module.exports = function(app) {
  const sequelize = app.get('sequelize');
  const users = sequelize.define('users', {
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING
    },
  }, {
    classMethods: {}
  });

  return users;
};
