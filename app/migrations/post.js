'use strict';

var faker = require('faker');

faker.locale = 'pt_BR';

module.exports = function (sequelize, models) {
	var Post = models.Post;
	var Category = models.Category;
	var Comment = models.Comment;
	var User = models.User;

	var status = ['open', 'solved', 'closed'];

	var posts = [];

	for(var i=0; i<10; i++) {
		posts.push({
			title: faker.lorem.words(5).join(' '),
			body: faker.lorem.paragraphs(10),
			status: status[Math.floor(Math.random() * status.length)]
		});
	}

	Category.build({
		name: faker.lorem.words(3).join(' ')
	}).save().then(function (category1) {
		Category.build({
			name: faker.lorem.words(4).join(' ')
		}).save().then(function (category2) {
			Category
				.build({
					name: faker.lorem.words(3).join(' ')
				})
				.save()
				.then(function (category3) {
					var categories = [category1, category2, category3];

					User
						.build({
							first_name: faker.name.firstName(),
							last_name: faker.name.lastName(),
							email: faker.internet.email(),
							password: '123456789'
						})
							.save()
							.then(function (user) {
								posts
									.forEach(function (post) {
										Post
											.build(post)
											.save()
											.then(function (post) {
												post
													.setAuthor(user)
													.then(function () {
														post
															.setCategory(categories[Math.floor(Math.random() * categories.length)])
															.then(function () {
																for(var i=0; i<3; i++) {
																	Comment.build({
																		body: faker.lorem.paragraph()
																	}).save().then(function (comment) {
																		comment.setPost(post).then(function () {
																			User
																				.build({
																					first_name: faker.name.firstName(),
																					last_name: faker.name.lastName(),
																					email: faker.internet.email(),
																					password: '123456789'
																				})
																				.save()
																				.then(function (user) {
																					comment.setAuthor(user);
																				});
																		});
																	});
																}
															});
													});
											});
									});
							});
				});
		});
	})
};