'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Templates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      projectTitle: {
        type: Sequelize.STRING
      },
      navbar: {
        type: Sequelize.JSON
      },
      main: {
        type: Sequelize.JSON
      },
      about: {
        type: Sequelize.JSON
      },
      service: {
        type: Sequelize.JSON
      },
      contact: {
        type: Sequelize.JSON
      },
      footer: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Templates');
  }
};