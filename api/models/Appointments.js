/**
* Appointments.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
  		type: 'string',
  		required: true,
  		unique: false
  	},
    service: {
      type: 'string',
      required: true,
      unique: false
    },
  	startAt: {
  		type: 'string',
  		required: true,
  		unique: false
  	},
  	endAt: {
  		type: 'string',
  		required: true,
  		unique: false
  	},
    date: {
      type: 'string',
      required: true,
      unique: false
    },
    authID: {
      type: 'string', 
      unique: false
    },
    user: {
      model: 'User',
      required: true
    }
  }
};

