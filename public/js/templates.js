angular.module("angular-io").run(["$templateCache", function($templateCache) {$templateCache.put("home/home.tmpl.html","<div class=\"row\">\n	<div class=\"large-12 columns\" ui-view></div>\n</div>");
$templateCache.put("user/user.tmpl.html","<div class=\"row\">\n	<div class=\"large-12 columns\" ui-view></div>\n</div>");
$templateCache.put("home/home.tmpl.html","<div class=\"row\">\n	<div class=\"large-12 columns\" ui-view></div>\n</div>");
$templateCache.put("user/user.tmpl.html","<div class=\"row\">\n	<div class=\"large-12 columns\" ui-view></div>\n</div>");
$templateCache.put("home/home-index/home-index.tmpl.html","<h1>Welcome!</h1>");
$templateCache.put("user/user-create/user-create.tmpl.html","<div class=\"row\">\n	<div class=\"large-6 columns\"></div>\n	<div class=\"large-6 columns\">\n		<h3>Register</h3>\n\n		<form ng-submit=\"userCreateCtrl.storeUser(user)\">\n			<div class=\"row\">\n				<div class=\"small-6 columns\">\n					<label>\n						<input ng-model=\"user.first_name\" placeholder=\"Your first name\" type=\"text\">\n					</label>\n				</div>\n				<div class=\"small-6 columns\">\n					<label>\n						<input ng-model=\"user.last_name\" placeholder=\"Your last name\" type=\"text\">\n					</label>\n				</div>\n			</div>\n\n			<div class=\"row\">\n				<div class=\"small-12 columns\">\n					<input ng-model=\"user.email\" placeholder=\"Your e-mail address\" type=\"email\">\n				</div>\n			</div>\n\n			<div class=\"row\">\n				<div class=\"small-12 columns\">\n					<label>\n						<input ng-model=\"user.password\" placeholder=\"Your password\" type=\"password\">\n					</label>\n				</div>\n			</div>\n\n			<div class=\"row\">\n				<div class=\"small-12 columns\">\n					<button class=\"button\" type=\"submit\">Do me!</button>\n				</div>\n			</div>\n		</form>\n	</div>\n</div>");
$templateCache.put("user/user-profile/user-profile.tmpl.html","<div></div>");
$templateCache.put("home/home-index/home-index.tmpl.html","<h1>Welcome!</h1>");
$templateCache.put("user/user-create/user-create.tmpl.html","<div class=\"row\">\n	<div class=\"large-6 columns\"></div>\n	<div class=\"large-6 columns\">\n		<h3>Register</h3>\n\n		<form ng-submit=\"userCreateCtrl.storeUser(user)\">\n			<div class=\"row\">\n				<div class=\"small-6 columns\">\n					<label>\n						<input ng-model=\"user.first_name\" placeholder=\"Your first name\" type=\"text\">\n					</label>\n				</div>\n				<div class=\"small-6 columns\">\n					<label>\n						<input ng-model=\"user.last_name\" placeholder=\"Your last name\" type=\"text\">\n					</label>\n				</div>\n			</div>\n\n			<div class=\"row\">\n				<div class=\"small-12 columns\">\n					<input ng-model=\"user.email\" placeholder=\"Your e-mail address\" type=\"email\">\n				</div>\n			</div>\n\n			<div class=\"row\">\n				<div class=\"small-12 columns\">\n					<label>\n						<input ng-model=\"user.password\" placeholder=\"Your password\" type=\"password\">\n					</label>\n				</div>\n			</div>\n\n			<div class=\"row\">\n				<div class=\"small-12 columns\">\n					<button class=\"button\" type=\"submit\">Do me!</button>\n				</div>\n			</div>\n		</form>\n	</div>\n</div>");
$templateCache.put("user/user-profile/user-profile.tmpl.html","<div></div>");}]);