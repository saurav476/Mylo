'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("user",{
      UserId:{
        type:Sequelize.STRING,
        primaryKey:true
      },
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
   })
 },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("user");
  }
};
