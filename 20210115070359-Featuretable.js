'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("feature",{
      Type:{
        type:Sequelize.STRING,
        primaryKey:true
      },
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
   })
 },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("feature");
  }
};
