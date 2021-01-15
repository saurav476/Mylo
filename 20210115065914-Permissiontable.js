'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("permission",{
      PermiId:{
        type:Sequelize.STRING,
        primaryKey:true
      },
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
   })
 },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("permission");
  }
};
