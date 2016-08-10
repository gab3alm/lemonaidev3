import {Users} from '../../both/collections/users';
import {Meteor} from 'meteor/meteor';

Meteor.publish('StaffNames', function(){
	return Users.find({'profile.category':'staff'} , {fields: { 'username':1, 'profile.firstname':1, 'profile.lastname':1}});
});

Meteor.publish('user', function(ID:string){
	return Users.find({'_id':ID});
});

Meteor.publish('everyone', function(){
	return Users.find();
});

Meteor.publish('getStaff', function(){
	return Users.find({'profile.category':'staff'});
});

Meteor.publish('PresentStudents', function(){
	return Users.find({'profile.category':'student'});
});

Meteor.publish('getStaffStudents', function(staff:string){
	return Users.find({'profile.supervisor':staff});
});

Meteor.publish('getSingleStaff', function(username:string){
	return Users.find({'username':username});
});
