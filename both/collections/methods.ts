import {ConversationSubscriptions} from './conversationSubscriptions';
import {ConversationStreams} from './conversationStream';
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
		// ConversationStreams.update();
	}

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
		ConversationStreams.update({"_id":conversationID}, {$addToSet:{
			'messages':new Message(sent, senderName, message)
		}});
	}
})