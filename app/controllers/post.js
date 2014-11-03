'use strict';

var _ = require('underscore');
var path = require('path');
var Paginator = require(path.join(path.dirname(__dirname), 'paginator'));

var models = require(path.join(path.dirname(__dirname), 'models'));
var Post = models.Post;
var User = models.User;
var Category = models.Category;

var GET_FIELDS = [
	'id',
	'title',
	'body'
];

var POST_FIELDS = GET_FIELDS;

exports.list = function (req, res) {
	var query = req.query;

	// paginator configs
	var page = query.page || 1;
	var perPage = query.per_page || 10;
	var paginator = new Paginator(page, perPage);

	var options = {
		attributes: GET_FIELDS,
		where: {}
	};

	// if we want to search the pastes
	// by the author/user_id
	_.each(['author_id', 'category_id'], function (key) {
		if(_.isUndefined(query[key])) return;

		options.where[key] = query[key];
	});

	// the startFrom and the
	// limit of the query
	// avoiding database memory leak
	options.limit = paginator.getLimit();
	options.offset = paginator.getOffset();

	options.include = [{
		model: User,
		as: 'author',
		attributes: ['first_name', 'last_name']
	}, {
		model: Category,
		as: 'category'
	}];

	Post.findAndCountAll(options)
		.then(function (result) {
			var rows = result.rows;
			var count = result.count;

			var currentPage = paginator.getCurrentPage();
			var lastPage = paginator.getLastPage(count);
			var pages = paginator.getPages();

			res.json({
				data: rows,
				pagination: {
					count: count,
					currentPage: currentPage,
					lastPage: lastPage,
					pages: pages
				}
			});
		}, function (err) {
			res.json(err);
		});
};

exports.get = function (req, res) {
	Post.find({
		where: {
			id: req.params.post
		},
		attributes: GET_FIELDS,
		include: [{
			model: User,
			as: 'author',
			attributes: ['first_name', 'last_name']
		}, {
			model: Category,
			as: 'category',
			attributes: ['name']
		}]
	}).then(function (post) {
		res.json(post);
	}, function (err) {
		res.json(err);
	});
};

exports.store = function (req, res) {
	var post = _.pick(req.body, POST_FIELDS);
	
	var author_id = (req.user.id || 0);

	Post.build(post).save().then(function (post) {		
		Post.find({
			where: {
				id: post.id
			},
			attributes: GET_FIELDS
		}).then(function (post) {
			User.find(author_id).then(function (user) {
				post.setAuthor(user).then(function () {
					Category.find({
						where: {
							id: req.body.category_id || 0
						}
					}).then(function (category) {
						post.setCategory(category);
					});
				});

				res.json(post);
			});
		}, function (err) {
			res.json(err);
		});
	}, function (err) {
		res.json(err);
	});
};

exports.destroy = function (req, res) {
	var author_id = req.user.id || 0;

	Post.destroy({
		where: {
			id: req.params.post,
			author_id: author_id
		}
	}).then(function (affectedRows) {
		res.json({ affectedRows: affectedRows });
	}, function (err) {
		res.json(err);
	});
};

exports.update = function (req, res) {
	var author_id = req.user.id || 0;

	var post = _.pick(req.body, POST_FIELDS);

	Post.update(post, {
		where: {
			id: req.params.post,
			author_id: req.user.id
		}
	}).then(function (affectedRows) {
		res.json({ affectedRows: affectedRows });
	}, function (err) {
		res.json(err);
	});
};