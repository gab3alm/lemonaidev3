import {TaskStreams} from '../../both/collections/taskStream';
import {Meteor} from 'meteor/meteor';

Meteor.publish('taskstream', function(){
	return TaskStreams.find();
});
