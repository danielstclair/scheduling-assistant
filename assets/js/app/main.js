$(document).ready(function(){
	// basic page logic
	(function (){
		$('.ion-close').hide();
		$('.navs').hide();
		$('.page-view').hide();
		var times = ['9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm', '5:00 pm'];
		var endTimes = times.slice(0, 16);
		endTimes.shift();
		endTimes.push('5:30 pm');
		console.log('appointment');
		for(var i = 0; i<times.length; i++){
			var timeTemplate = '<option class="start-options" value="' + times[i] + '">' + times[i] + '</option>';
			$('#start-time').append(timeTemplate);
		}
		for(var j = 0; j< endTimes.length; j++){
			var timeTemplate2 = '<option class="end-options" value="' + endTimes[j] + '">' + endTimes[j] + '</option>';
			$('#end-time').append(timeTemplate2);
		}
	})();
	$('.ion-navicon').click(function(){
		$(this).hide();
		$('.ion-close').show();
		$('.navs').show();
	});
	$('.ion-close').click(function(){
		hideNav();
	});
	function hideNav(){
		$('.ion-close').hide();
		$('.ion-navicon').show();
		$('.navs').hide();
	}
	$('.homeNav').click(function(){
		homeIsShown();
	});
	$('.loginNav').click(function(){
		loginIsShown();
	});
	$('.registerNav').click(function(){
		registerIsShown();
	});
	$('.appointNav').click(function(){
		appointmentIsShown();
	});
	$('.navs').click(function(){
		hideNav();
	});
	function landingIsShown(){
		$('.page-view').hide();
		$('#landing-view').show();
		$('.navs').removeClass('selected');
	}
	function homeIsShown(){
		$('.page-view').hide();
		$('#home-view').show();
		$('.navs').removeClass('selected');
		$('.homeNav').addClass('selected');
	}
	function loginIsShown(){
		$('.page-view').hide();
		$('#login-view').show();
		$('.navs').removeClass('selected');
		$('.loginNav').addClass('selected');
	}
	function registerIsShown(){
		$('.page-view').hide();
		$('#register-view').show();
		$('.navs').removeClass('selected');
		$('.registerNav').addClass('selected');
	}
	function appointmentIsShown(){
		$('.page-view').hide();
		$('#appointment-view').show();
		$('.navs').removeClass('selected');
		$('.appointNav').addClass('selected');
	}
	function resetVal(){
		$('#registerEmail').val('');
		$('#registerPassword').val('');
		$('#loginEmail').val('');
		$('#loginPassword').val('');
		$('#description').val();
		$('#startDate').val('');
		$('#start-time').val('');
		$('#end-time').val('');
	}



// login and registration logic
	var users = null;
	function getUser(){
		$.get('/auth/user', function(data){
			// console.log(data);
		}).done(function(user){
			console.log(user);
			users = user;
			if(user.username.indexOf('@hf.com') > -1){
				homeIsShown();
				getAuthUser(user);
			} else{
				homeIsShown();
				getUserAppointments(user.id);
			}
		}).fail(function(err){
			landingIsShown();
		});
	}
	function getAuthUser(authUser){
		$.get('/authUsers', function(data){
			var currentAuth = _.filter(data, function(a){
				return a.id === authUser.id;
			});
			getAuthUserAppointments(currentAuth[0]);
		});
	}
	getUser();
	function login(){
		var loginForm = {
			email: $('#loginEmail').val(),
			password: $('#loginPassword').val()
		};
		$.ajax({
			type: 'POST',
			url: '/auth/local',
			data: {
				identifier: loginForm.email,
				password: loginForm.password
			},
			success: function(data){
				console.log(data);
				if(data.user.email.indexOf('@hf.com') > -1){
					getAuthUserAppointments(data.user);
				}
				getUser();
				resetVal();
			},
			error: function(err){
				console.log(err);
			}
		});
	}
	$('#loginSubmit').click(function(){
		login();
	});
	function register(){
		var authId = null;
		var regForm = {
			email: $('#registerEmail').val(),
			password: $('#registerPassword').val()
		};
		$.ajax({
			type: 'POST',
			url: '/auth/local/register',
			data: {
				username: regForm.email,
				email: regForm.email,
				password: regForm.password
			},
			success: function(data){
				console.log(data);
				if(data.user.email.indexOf('@hf.com') > -1){
					registerAuthUser(data.user);
				}
				getUser();
				resetVal();
			},
			error: function(err){
				console.log(err);
			}
		});
	}
	$('#registerSubmit').click(function(){
		register();
	});
	function registerAuthUser(user){
		$.ajax({
			type: 'POST',
			url: '/authUsers',
			data: {
				username: user.username,
				email: user.email,
				authID: user.id
			},
			success: function(data){
				console.log(data);
			},
			error: function(err){
				console.log(err);
			}
		});
	}
	function logout(){
		$.ajax({
			type: 'POST',
			url: '/logout',
			success: function(data){
				console.log('success');
				resetVal();
				landingIsShown();
			},
			error: function(err){
				console.log(err);
			}
		});
	}
	$('#logout').click(function(){
		logout();
	});




// Appointment logic
	$('#submit').click(function(){
		var appDeets = {
			desc: $('#description').val(),
			dates: $('#startDate').val(),
			startAt: $('#start-time').val(),
			endAt: $('#end-time').val(),
			service: $('#service-type option:selected').text()
		};
		postAppointments(appDeets);
	});
	function postAppointments(a){
		var authId = null;
		if (a.desc === '' || a.service === '' || a.startAt === '' || a.endAt === '' || a.dates === '') {
			console.log('error');
			return;
		}
		if(a.service === "Health"){
			authId = '1';
		} else if(a.service === 'Food'){
			authId = '2';
		} else if(a.service === 'Housing'){
			authId = '3';
		} else if(a.service === 'Medical'){
			authId = '4';
		} else {
			authId = '5';
		}
		$.ajax({
			method: 'POST',
			url: '/appointments',
			data: {
				authID: authId,
				name: a.desc,
				service: a.service,
				startAt: a.startAt,
				endAt: a.endAt,
				dates: a.dates,
				user: users
			}
		}).done(function(data){
			authID = null;
			resetVal();
			homeIsShown();
			renderNewAppointment(data);
			console.log(data);
		}).error(function(err){
			console.log(err);
		});
	}
	function getUserAppointments(users){
		console.log(users);
		$.get('/appointments', function(data){
			console.log(data);
			var uniqueData = _.filter(data, function(a){
				return a.user.id === users;
			});
			console.log(uniqueData);
			renderAppointments(uniqueData);
		});
	}
	function getAuthUserAppointments(user){
		console.log(user);
		$.get('/appointments', function(collection){
			console.log(collection);
			var filteredCollection = _.filter(collection, function(a){
				return a.authID === user.authID;
			});
			console.log(filteredCollection);
			renderAppointments(filteredCollection);
		});
	}
	function renderNewAppointment(app){
		var appointmentTemplate = '<li><div class="appointment-date"><span>You have an appointment on ' + app.dates + ' from ' + app.startAt + ' to ' + app.endAt + '.</span></div><div class="appointment-description"><p>Description: ' + app.name  + '</p><p>Service: ' + app.service + '</p></div></li>';
		$('#shown-appointments').append(appointmentTemplate);
	}
	function renderAppointments(app){
		console.log(app);
		var i = app.length;
		while(i--){
			console.log(app[i]);
			var appointmentTemplate = '<li><div class="appointment-date"><span>You have an appointment on ' + app[i].dates + ' from ' + app[i].startAt + ' to ' + app[i].endAt + '.</span></div><div class="appointment-description"><p>Description: ' + app[i].name  + '</p><p>Service: ' + app[i].service + '</p></div></li>';
			$('#shown-appointments').append(appointmentTemplate);
		}
	}



});