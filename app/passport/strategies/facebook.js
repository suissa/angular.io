var generatePassword = require('password-generator');
var FacebookStrategy = require('passport-facebook').Strategy;
var path = require('path');
var User = require(path.join(path.dirname(path.dirname(__dirname)), 'models')).User;

var FACEBOOK_APP_ID = '337526333091962',
FACEBOOK_APP_SECRET = '4bf08bd48e2feccfd06a448cb5435973';

module.exports = function (passport) {
	passport.use(new FacebookStrategy({
		clientID: FACEBOOK_APP_ID,
		clientSecret: FACEBOOK_APP_SECRET,
		callbackURL: '/api/auth/facebook/callback',
	}, function (accessToken, refreshToken, profile, done) {
		function onError (err) {
			return done(err);
		}

		User
		.find({
			where: {
				fb_id: profile.id
			}
		})
		.then(function(user) {
			if(user) {
				// User with this fb_id exist, authenticating.
				return done(null, user);
			}

			/**
			 * User with this fb_id does not exist, checking if there
			 * is a user with this email address.
			 */
			User
			.find({
				where: {
					email: profile.emails[0].value
				}
			})
			.then(function(user) {
				if(!user) {
					/**
					 * User with this email address does not exist
					 * either, creating a new one.
					 */
					var password = generatePassword(12, false);

					return User
						.create({
							first_name: profile.name.givenName,
							last_name: profile.name.familyName,
							email: profile.emails[0].value || '',
							password: password,
							// username: profile.displayName.toString()
							// 														 .toLowerCase()
							// 														 .replace(/ /g, ''),
							fb_id: profile.id.toString()
						})

						.then(function(user) { // Authenticating the new user.
							return done(null, user);
						}, onError);
				}

				/**
				 * User with this email exists, setting his fb_id
				 * with the same as his facebook account for good!
				 */
				User
					.update({
						fb_id: profile.id
					}, {
						where: {
							id: user.id
						}
					})

					.then(function(user) {
						done(null, user);
					}, onError);
			}, onError);
		}, onError);
	}));
};