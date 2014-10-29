var passport = require('passport');
var path = require('path');
var User = require(path.join(path.dirname(__dirname), 'models')).User;

passport.serializeUser(function(user, done) {
  done(null, user.id || user[0]);
});

passport.deserializeUser(function(id, done) {
  User.find(id).then(function(user) {
    done(null, user);
  }, function (err) {
  	done(err, null);
  });
});

require(path.join(__dirname, 'strategies'))(passport);

module.exports = passport;