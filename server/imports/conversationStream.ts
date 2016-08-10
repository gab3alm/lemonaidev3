import {ConversationStreams} from '../../both/collections/conversationStream';
import {Meteor} from 'meteor/meteor';

Meteor.publish('conversationStream', function(ID){
	return ConversationStreams.find({'_id':ID});
});
