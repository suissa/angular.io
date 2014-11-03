'use strict';

module.exports = function (sequelize, models) {
	var Post = models.Post;

	var categories = [];

	for(var i=0; i<200; i++) {
		categories.push({
			title: 'Some example paste',
			body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores optio totam aperiam nesciunt vero neque nam est beatae excepturi. Eveniet voluptates facere enim natus! Hic ratione, sapiente natus eius repellendus.'
		});
	}

	categories.forEach(function (category) {
		Post.build(category).save();
	});
};