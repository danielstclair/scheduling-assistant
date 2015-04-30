var AppView = Backbone.View.extend({
	el: '#app',
	currentUser: function(){
		// should make some logic later
		return true
	},
	events:{
		'click #logout': 'logout'
	},
	initialize: function(){
		this.homeView = new HomeView();
		this.loginView = new LoginView();
		this.registerView = new RegisterView();
		this.appointmentsView = new AppointmentsView();

		var self = this;
		var Router = Backbone.Router.extend({
			routes:{
				'home' : 'home',
				'login' : 'login',
				'register' : 'register',
				'appointments' : 'appointments'
			},

			home: function(){
				console.log('home');
				self.hideAllPages();
				self.homeView.$el.show();
				$('.navs').removeClass('selected');
				$('.homeNav').addClass('selected');
			},

			login: function(){
				console.log('login');
				self.hideAllPages();
				self.loginView.$el.show();
				$('.navs').removeClass('selected');
				$('.loginNav').addClass('selected');
			},

			register: function(){
				console.log('register');
				self.hideAllPages();
				self.registerView.$el.show();
				$('.navs').removeClass('selected');
				$('.registerNav').addClass('selected');
			},

			appointments: function(){
				console.log('appointments');
				self.hideAllPages();
				self.appointmentsView.$el.show();
				$('.navs').removeClass('selected');
				$('.appointNav').addClass('selected');
			}
		});

		var appRouter = new Router();
		Backbone.history.start();
	},

	hideAllPages: function(){
		$('.page-view').hide();
	},
	logout: function(){
		console.log('you motherfucker')
		$.ajax({
			type: 'POST',
			url: '/logout',
			success: function(data){
				console.log(data);
			},
			error: function(err){
				console.log(err);
			}
		})
	}
});