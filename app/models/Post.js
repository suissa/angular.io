'use strict';

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
	var Post = sequelize.define('Post', {
		title: DataTypes.STRING(255),
		body: DataTypes.TEXT,
		status: {
			type: DataTypes.ENUM,
			values: ['open', 'solved', 'closed']
		}
	}, {
		timestamps: true,
		paranoid: true,
		underscored: true,
		tableName: 'posts',
		classMethods: {
			associate: function (models) {
				var User = models.User;
				var Category = models.Category;

				Post.belongsTo(Category, {
					as: 'category',
					foreignKey: 'category_id'
				});

				Category.hasMany(Post, {
					as: 'posts',
					foreignKey: 'category_id'
				});

				User.hasMany(Post, {
					as: 'posts',
					foreignKey: 'author_id'
				});

				Post.belongsTo(User, {
					as: 'author',
					foreignKey: 'author_id'
				});
			}
		}
	});

	return Post;
};