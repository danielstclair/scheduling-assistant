this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1>home</h1>\n<a ui-sref="login">login</a>\n<a ui-sref="register">register</a>';

}
return __p
};

this["JST"]["assets/templates/login.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="login-view">\n\t<h1>login</h1>\n\n\t<a ui-sref="home">home</a>\n\t<a ui-sref="register">register</a>\n\t<div class="login-form">\n\t\t<input class="email" ng-model="email" ng-change="emailCheck(email)" type="text" placeholder="enter email...">\n\t\t<p class="errors" ng-show="emailError">must be an email address =)</p>\n\t\t<input class="password" ng-model="password" ng-change="passwordCheck(password)" type="text" placeholder="enter password...">\n\t\t<p class="errors" ng-show="passwordError">password does not match =(</p>\n\t\t<button ng-click="loginSubmit()">submit</button>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["assets/templates/register.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="register-view">\n\t<h1>register</h1>\n\n\t<a ui-sref="login">login</a>\n\t<a ui-sref="home">home</a>\n\t<div class="login-form">\n\t\t<input class="regUser" ng-model="regUser" ng-change="regUserCheck(regUser)" type="text" placeholder="enter user name...">\n\t\t<p class="errors" ng-show="userError">can\'t be left blank =(</p>\n\t\t<input class="regEmail" ng-model="regEmail" ng-change="regEmailCheck(regEmail)" type="text" placeholder="enter email...">\n\t\t<p class="errors" ng-show="emailError">must be an email address =)</p>\n\t\t<input class="regPassword" ng-model="regPassword" ng-change="regPasswordCheck(regPassword)" type="text" placeholder="enter password...">\n\t\t<p class="errors" ng-show="passwordError">password does not match =(</p>\n\t\t<button ng-click="regSubmit()">submit</button>\n\t</div>\n</div>';

}
return __p
};