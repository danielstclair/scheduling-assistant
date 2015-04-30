var Appointments = Backbone.Collection.extend({
	model: Appointment,
	url: '/appointments'
});