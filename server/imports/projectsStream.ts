import {Meteor} from 'meteor/meteor';
import {ProjectsStream} from '../../both/collections/projectsStream';

Meteor.publish('getProject', function(ID){
	return ProjectsStream.find({'_id':ID});
});
