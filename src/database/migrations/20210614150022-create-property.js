'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        reference: {
          model:'user',
          key:'id'
        }
      },
      destination_id: {
        type: Sequelize.INTEGER,
        reference: {
          model:'destination',
          key:'id'
        }
      },
      wifi: {
        type: Sequelize.TINYINT
      },
      pool: {
        type: Sequelize.TINYINT
      },
      parking: {
        type: Sequelize.TINYINT
      },
      barbecue: {
        type: Sequelize.TINYINT
      },
      price: {
        type: Sequelize.DECIMAL
      },
      category_id: {
        type: Sequelize.INTEGER,
        reference: {
          model:'category',
          key:'id'
        }
      },
      n_of_people: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Properties');
  }
};