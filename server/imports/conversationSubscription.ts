import {ConversationSubscriptions} from '../../both/collections/conversationSubscriptions';
import {Meteor} from 'meteor/meteor';

Meteor.publish('conversationSubscriptions', function(ID){
	return ConversationSubscriptions.find({'_id':ID});
});

