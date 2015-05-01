/**
* AuthUsers.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    authID: {type: 'string', unique: false, required: false},
    appointments : { model: 'Appointments', required: false}
  }
};

