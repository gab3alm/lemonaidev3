import {ConversationSubscriptions} from './conversationSubscriptions';
import {ConversationSubscriptionModel} from '../models/conv.subscriptions.model';
import {ConversationStreams} from './conversationStream';
import {ConversationStreamsModel} from '../models/conv.streams.model';
import {Users} from './users';
import {Meteor} from 'meteor/meteor';
import {Message} from '../classes/message';
import {moment} from 'meteor/momentjs:moment';
import {check} from 'meteor/check';


function updateUserSubscription(userID:string, newConversationRef:string, status:string){
	var UserConvSubscription = Users.find({'_id':userID}).fetch()[0].profile.conversationSubs;
	if(status == 'recipient'){
		ConversationSubscriptions.update({'_id':UserConvSubscription}, {$inc:{
			'unread':1
		}});
	}
	ConversationSubscriptions.update({'_id':UserConvSubscription}, {$addToSet: {
		'conversations':newConversationRef
	}});
}

function getSenderName(sender:string){
	var first = Users.find({"_id":sender}).fetch()[0].profile.firstname;
	var last = Users.find({"_id":sender}).fetch()[0].profile.lastname;
	var senderName = first + " " + last;
	return senderName;
}

function getRecipient(conversationID:string, sender:string){
	var subscriberList = ConversationStreams.find({'_id':conversationID}).fetch()[0].subscribers;
	var recipientList = [];
	for(var i = 0 ; i < subscriberList.length; i++){
		if(subscriberList[i].user != sender){
			recipientList.push(subscriberList[i].user);
		}
	}
	return recipientList;
}

function updateUnread(conversationID:string, recipientList:Array<string>){
	// Update unread (ConversationSubscription Level)
	for(var i = 0 ; i < recipientList.length; i++){
		var subscriptionID = Users.find({"_id":recipientList[i]}).fetch()[0].profile.conversationSubs;
		ConversationSubscriptions.update({"_id":subscriptionID}, {$inc: {
			'unread':1
		}});
	}

	//Update unread (ConversationStream Level)
	for(var i = 0 ; i < recipientList.length; i++){
		if(Meteor.userId() != recipientList[i]){
			ConversationStreams.update({'_id':conversationID, 'subscribers':{$elemMatch: {'user':recipientList[i]}}}, {
				$inc : {'subscribers.$.unread':1}
			});
		}
	}
}

// Unsubscribe user from conversation
function unsubscribeConversation(reference:string){
	ConversationStreams.update({'_id':reference, 'subscribers':{$elemMatch: {'user':Meteor.userId()}}}, {
		$set : {'subscribers.$.subscribed':0}
	});
}


Meteor.methods({
	// CREATES A NEW CONVERSATION
	createNewConversation:function(title:string, sender:string, recipient:string, message:string){
		check(title, String); check(sender, String); check(recipient, String); check(message, String);
		var dateCreated = moment().format('MMMM Do YYYY, h:mm:ss a');

		var first = Users.find({"_id":sender}).fetch()[0].profile.firstname;
		var last = Users.find({"_id":sender}).fetch()[0].profile.lastname;
		var senderName = first + " " + last;

		ConversationStreams.insert({
			title:title,
			created: dateCreated,
			subscribers:[
			{'user':sender, 'unread':0, 'subscribed':1},
			{'user':recipient, 'unread':1, 'subscribed':1}
			],
			messages:[
			new Message(dateCreated, senderName, message)
			]
		}, (err, insertionID)=>{
			if(err){
					// message insertion failed
					console.log(err);
				}else{
					// Insert new conversation reference in the users subscriptions
					updateUserSubscription(sender, insertionID, 'sender');
					updateUserSubscription(recipient, insertionID, 'recipient');
					// console.log('maybe we got it right!');
				}
			});
	},



	// SENDS A MESSAGE
	sendMessage:function(conversationID:string, sender:string, message:string){
		check(conversationID, String); check(sender, String); check(message, String);
		var sent = moment().format('MMMM Do YYYY, h:mm:ss a');
		var senderName = getSenderName(sender);
		var recipientList = getRecipient(conversationID, sender);
		updateUnread(conversationID, recipientList);
		
		// insert message into ConversationStream
		ConversationStreams.update({"_id":conversationID}, {$addToSet:{
			'messages':new Message(sent, senderName, message)
		}});

		// insert conversation into recipient if they have deleted it
		for(var i = 0; i < recipientList.length; i++){
			if(recipientList[i] != Meteor.userId()){
				var convSubsID = Users.find({'_id':recipientList[i]}).fetch()[0].profile.conversationSubs;
				ConversationSubscriptions.update({'_id':convSubsID}, {$addToSet: {
					'conversations':conversationID
				}});
			}
		}
	},



	// Delete Conversation
	deleteConversation:function(conversationID:string, conversationStreamID:string){
		// unsubscribe user in conversationStream
		unsubscribeConversation(conversationStreamID);
		// delete subscription from user conversationSubscriptions
		var userConvSubs = Users.find({'_id':Meteor.userId()}).fetch()[0].profile.conversationSubs;
		ConversationSubscriptions.update({'_id':userConvSubs}, {$pull : {
			conversations : conversationID
		}});
	},


	//Clear conversation unread count
	clearConversationUnread:function(conversationStreamID:string){
		//ConversationsStream Level
		var subscribers = ConversationStreams.find({'_id':conversationStreamID}).fetch()[0].subscribers;
		var unread = 0;
		for(var i = 0; i < subscribers.length; i++){
			if(subscribers[i].user == Meteor.userId()){
				unread = subscribers[i].unread;
			}
		}
		// Clear ConversationStream Level
		ConversationStreams.update({'_id':conversationStreamID, 'subscribers':{$elemMatch: {'user':Meteor.userId()}}}, {
			$set : {'subscribers.$.unread':0}
		});

		// ConversationSubscription Level
		// Decrease the unread counter by the number of unread messages in the opened conversation
		var conversationSubsID = Users.find({'_id':Meteor.userId()}).fetch()[0].profile.conversationSubs;
		unread *= -1; // Make the unread value negative
		ConversationSubscriptions.update({'_id':conversationSubsID}, {
			$inc : {'unread':unread}
		});

	}
})