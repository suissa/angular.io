'use strict';

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
	var Comment = sequelize.define('Comment', {
		body: DataTypes.TEXT
	}, {
		timestamps: true,
		paranoid: true,
		underscored: true,
		tableName: 'comments',
		classMethods: {
			associate: function (models) {
				var Post = models.Post;
				var User = models.User;

				// Post
				Post.hasMany(Comment, {	as: 'comments' });

				Comment.belongsTo(Post, {	as: 'post' });

				// User
				Comment.belongsTo(User, {
					as: 'author',
					foreignKey: 'author_id'
				});

				User.hasMany(Comment, {
					as: 'comments',
					foreignKey: 'author_id'
				});
			}
		}
	});

	return Comment;
};