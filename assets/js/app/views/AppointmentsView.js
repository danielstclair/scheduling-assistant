var AppointmentsView = Backbone.View.extend({
	el: '#appointment-view',
	// my_template: _template('')
	initialize: function(options){
		this.appointmentTime = new AppointmentTime();
		// this.render();
	},
	render: function(){
		// for(var i = 0; i< times.length; i++){
		// 	$('#timeOption').html(times[i]));
		// }
	}
});
var AppointmentTime = Backbone.View.extend({
	el: '#timeOption',
	template: function(){
		var times= ['9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm', '5:00 pm', '5:30 pm'];
		for(var i = 0; i< times.length; i++){
			_.template('<option value="' + times[i] + '">' + times[i] + '</option>')
		}
	},
	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html(this.template());
	}
});

// var Times = Backbone.Model.extend({
// 	defaults:{
// 		times: ['9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm', '5:00 pm', '5:30 pm']
// 	}
// })