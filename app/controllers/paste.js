'use strict';

var _ = require('underscore');
var path = require('path');

var models = require(path.join(path.dirname(__dirname), 'models'));
var Paste = models.Paste;
var User = models.User;

var GET_FIELDS = [
	'id',
	'title',
	'code'
];

var POST_FIELDS = GET_FIELDS;

exports.list = function (req, res) {
	Paste.findAll({
		attributes: GET_FIELDS
	}).then(function (pastes) {
		res.json(pastes)
	}, function (err) {
		res.json(err);
	});
};

exports.get = function (req, res) {
	Paste.find({
		where: {
			id: req.params.paste
		},
		attributes: GET_FIELDS,
		include: [{
			model: User,
			as: 'author',
			attributes: ['first_name', 'last_name']
		}]
	}).then(function (paste) {
		res.json(paste);
	}, function (err) {
		res.json(err);
	});
};

exports.store = function (req, res) {
	var paste = _.pick(req.body, POST_FIELDS);
	
	var author_id = (req.user.id || 0);

	Paste.build(paste).save().then(function (paste) {		
		Paste.find({
			where: {
				id: paste.id
			},
			attributes: GET_FIELDS
		}).then(function (paste) {
			User.find(author_id).then(function (user) {
				paste.setAuthor(user).then(function () {
					res.json(paste);
				});
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

	Paste.destroy({
		where: {
			id: req.params.paste,
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

	var paste = _.pick(req.body, POST_FIELDS);

	Paste.update(paste, {
		where: {
			id: req.params.paste,
			author_id: req.user.id
		}
	}).then(function (affectedRows) {
		res.json({ affectedRows: affectedRows });
	}, function (err) {
		res.json(err);
	});
};