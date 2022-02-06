'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostsCategories', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        filed: 'postId',
        references: {
          model: 'BlogPosts',
          ket: 'id',
        },
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        filed: 'categoryId',
        references: {
          model: 'Categories',
          ket: 'id',
        },
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};
