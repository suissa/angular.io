'use strict';

var _ = require('underscore');

function Paginator (page, perPage) {
	var lastPage;

	page = (!_.isNumber(page) ? Number(page) : page) || 1;
	perPage = (!_.isNumber(perPage) ? Number(perPage) : perPage) || 4;
	lastPage = 0;

	this.getOffset = function () {
		return (page - 1) * perPage;
	};

	this.getLimit = function () {
		return perPage;
	};

	this.getCurrentPage = function () {
		return page;
	};

	this.getLastPage = function (count) {
		count = Number(count);
		lastPage = Math.ceil((count / perPage - 1) + 1);

		return lastPage;
	};

	this.getPages = function () {
		var pages = [], i;

		for(i=1; i<lastPage + 1; i++) {
			pages.push(i);
		}

		return pages;
	};

	return this;
}

module.exports = Paginator;