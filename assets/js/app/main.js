$(document).ready(function(){
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
	})
	$('.ion-close').click(function(){
		hideNav();
	})
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
	})
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


	var users = null;
	function getUser(){
		$.get('/auth/user', function(data){
			// console.log(data);
		}).done(function(user){
			users = user;
			console.log(users);
			homeIsShown();
			getAppointments(user.id);
		}).fail(function(err){
			landingIsShown();
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
	function getAppointments(users){
		console.log(users);
		$.get('/appointments', function(data){
			console.log(data);
			var uniqueData = _.filter(data, function(a){
				return a.user.id === users;
			});
			console.log(uniqueData);
			for(var i = 0; i <= uniqueData.length; i++){
				var appointmentTemplate = '<li><div class="appointment-date"><span>You have an appointment on ' + uniqueData[i].date + ' from ' + uniqueData[i].startAt + ' to ' + uniqueData[i].endAt + '.</span></div><div class="appointment-description"><p>Description: ' + uniqueData[i].name  + '</p><p>Service: ' + uniqueData[i].service + '</p></div></li>';
				$('#shown-appointments').append(appointmentTemplate);
			}
		});
	}
	function getNewAppointment(app){
		var appointmentTemplate = '<li><span>You have an appointment on ' + app.date + ' from ' + app.startAt + ' to ' + app.endAt + '.</span><p>Description: ' + app.name  + '</p><p>Service: ' + app.service + '</p></li>';
		$('#shown-appointments').append(appointmentTemplate);
	}
	function getAuthUserAppointments(user){
		if(user.username === 'daniel@hf.com'){
			console.log('Daniel is logged in');
			$.get('/appointments', function(collection){
				console.log(collection);
				var filteredCollection = _.filter(collection, function(a){
					return a.authID === '1';
				});
				console.log(filteredCollection)
			})
		} else if(user.username === 'andrea@hf.com'){
			console.log('Andrea is logged in');
			$.get('/appointments', function(collection){
				console.log(collection);
				var filteredCollection = _.filter(collection, function(a){
					return a.authID === '2';
				});
				console.log(filteredCollection)
			})
		} else if(user.username === 'hall@hf.com'){
			console.log('Hall is logged in');
			$.get('/appointments', function(collection){
				console.log(collection);
				var filteredCollection = _.filter(collection, function(a){
					return a.authID === '3';
				});
				console.log(filteredCollection)
			})
		} else if(user.username === 'oates@hf.com'){
			console.log('Oates is logged in');
			$.get('/appointments', function(collection){
				console.log(collection);
				var filteredCollection = _.filter(collection, function(a){
					return a.authID === '4';
				});
				console.log(filteredCollection)
			})
		} else {
			console.log("We've recently hired a temp and they are logged in");
			$.get('/appointments', function(collection){
				console.log(collection);
				var filteredCollection = _.filter(collection, function(a){
					return a.authID === '5';
				});
				console.log(filteredCollection)
			})
		}
	}
	function postAppointments(a){
		var authId = null;
		if (a.desc === '' || a.service === '' || a.startAt === '' || a.endAt === '' || a.date === '') {
			console.log('error');
			return;
		};
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
				date: a.date,
				user: users
			}
		}).done(function(data){
			authID = null;
			resetVal();
			homeIsShown();
			getNewAppointment(data);
			console.log(data);
		}).error(function(err){
			console.log(err);
		});
	}


	$('#submit').click(function(){
		var appDeets = {
			desc: $('#description').val(),
			date: $('#startDate').val(),
			startAt: $('#start-time').val(),
			endAt: $('#end-time').val(),
			service: $('#service-type option:selected').text()
		};
		postAppointments(appDeets);
	});
});