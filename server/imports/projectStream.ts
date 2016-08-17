import {Meteor} from 'meteor/meteor';
import {ProjectStream} from '../../both/collections/projectStream';

Meteor.publish('getProjectStream', function(ID){
	return ProjectStream.find({'_id':ID});
});
