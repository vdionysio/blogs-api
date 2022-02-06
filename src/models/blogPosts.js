const BlogPost = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define(
    'BlogPosts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      updatedAt: 'updated',
      createdAt: 'published',
    },
  );

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'users' });
  };

  return blogPosts;
};

module.exports = BlogPost;
