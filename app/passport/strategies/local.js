var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var User = require(path.join(path.dirname(path.dirname(__dirname)), 'models')).User;

module.exports = function (passport) {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function (email, password, done) {
		User.find({
			where: {
				email: email
			}
		}).done(function (err, user) {
			if(err) return done(err);
			if(!user) {
				return done(null, false, { message: 'Incorrect email.' });
			}
			if(!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}));
};