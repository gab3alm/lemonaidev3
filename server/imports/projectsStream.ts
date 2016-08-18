import {Meteor} from 'meteor/meteor';
import {ProjectsStream} from '../../both/collections/projectsStream';

Meteor.publish('getProjectStream', function(ID){
	return ProjectsStream.find({'_id':ID});
});
