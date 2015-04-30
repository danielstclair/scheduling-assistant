angular.module('app.controllers', [])
.controller('homeCTRL', function($scope){

})
.controller('loginCTRL', function($scope){
	var emailIsValid = false;
	var passwordIsValid = false;
	var loginPass = {};
	$scope.emailError = false;
	$scope.passwordError = false;

	$scope.emailCheck = function(email){
		if(validator.isEmail(email)){
			emailIsValid = true;
			$scope.emailError = false;
		}
		else{
			emailIsValid = false;
			$scope.emailError = true;
		}
	}

	$scope.passwordCheck = function(password){
		if (validator.isNull(password)) {
			$scope.passwordError = true;
			passwordIsValid = false;
		}
		else{
			$scope.passwordError = false;
			passwordIsValid = true;
		}
	}

	$scope.loginSubmit = function(email, password){
		email = $scope.email;
		password = $scope.password;
		if(emailIsValid && passwordIsValid){
			loginPass = {
				identifier: email,
				password: password
			}
		}
		console.log(loginPass);
		console.log('click');
		$scope.email = '';
		$scope.password = '';
	}
})
.controller('registerCTRL', function($scope){
	var userIsValid = false;
	var emailIsValid = false;
	var passwordIsValid = false;
	var regPass = {};
	$scope.userError = false;
	$scope.emailError = false;
	$scope.passwordError = false;

	$scope.regUserCheck = function(regUser){
		if(validator.isNull(regUser)){
			userIsValid = false;
			$scope.userError = true;
		}
		else{
			userIsValid = true;
			$scope.userError = false;
		}
	}

	$scope.regEmailCheck = function(regEmail){
		if(validator.isEmail(regEmail)){
			emailIsValid = true;
			$scope.emailError = false;
		}
		else{
			emailIsValid = false;
			$scope.emailError = true;
		}
	}

	$scope.regPasswordCheck = function(regPassword){
		if(validator.isNull(regPassword)){
			passwordIsValid = false;
			$scope.passwordError = true;
		}
		else{
			passwordIsValid = true;
			$scope.passwordError = false;
		}
	}

	$scope.regSubmit = function(user, email, password){
		user = $scope.regUser;
		email = $scope.regEmail;
		password = $scope.regPassword;

		if(userIsValid && emailIsValid && passwordIsValid){
			regPass = {
				username: user,
				email: email,
				password: password
			}
		}

		console.log(regPass);
		console.log('click');
		$scope.regUser = '';
		$scope.regEmail = '';
		$scope.regPassword = '';
	}
})




























