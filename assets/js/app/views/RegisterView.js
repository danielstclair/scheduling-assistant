var RegisterView = Backbone.View.extend({
	el: '#register-view',
	events:{
		'click #registerSubmit': 'register'
	},
	initialize: function(options){

	},
	register: function(){
		var form = {
			username: $('#registerEmail').val(),
			email: $('#registerEmail').val(),
			password: $('#registerPassword').val()
		};
		$.ajax({
			type: 'POST',
			url: '/auth/local/register',
			data: {
				username: form.username,
				email: form.email,
				password: form.password
			},
			success: function(data){
				console.log(data);
				form.username = '';
				form.email = '';
				form.password = '';
			},
			error: function(err){
				console.log(err);
			}
		})
	}
});