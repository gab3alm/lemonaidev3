import {Component, Input, OnInit, OnDestroy, NgZone} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {Meteor} from 'meteor/meteor';
import {ConversationStreams} from '../../../both/collections/conversationStream';
import {Users} from '../../../both/collections/users';
import {Mongo} from 'meteor/mongo';
import {Tracker} from 'meteor/tracker';
import {Router} from '@angular/router';
import {ConversationStreamsModel} from '../../../both/models/conv.streams.model';

import template from './conversationpill.html';
@Component({
	selector:'conversation-pill',
	template,
	styleUrls:['styles/conversationpill.css']
})

export class ConversationpillComponent extends MeteorComponent implements OnInit, OnDestroy{
	@Input() reference:string;
	conversation:Mongo.Cursor<ConversationStreamsModel>;
	recipientImage:string = '';
	conversationTitle:string;
	lastMessage:string;
	constructor(private ngZone:NgZone, public router:Router){
		super();
	}

	ngOnInit(){
		this.subscribe('conversationStream', this.reference, ()=>{
			this.conversation = ConversationStreams.find({'_id':this.reference});
			this.conversationTitle = this.conversation.fetch()[0].title;
			this.findRecipient(Meteor.userId(), this.conversation);
			var messages = [];
			Tracker.autorun(()=>{
				this.ngZone.run(()=>{
				// Get the last message of the messages array
				messages = this.conversation.fetch()[0].messages;	
				this.lastMessage = messages[messages.length-1].message;
			});
			});
		}, true);		
	}

	findRecipient(userID:string, conversation:Mongo.Cursor<ConversationStreamsModel>){
		var subscribers = conversation.fetch()[0].subscribers;
		var recipient = '';
		for(var i = 0; i < subscribers.length; i++){
			if(userID != subscribers[i].user){
				recipient = subscribers[i].user;
			}
		}
		this.subscribe('user', recipient, ()=>{
			Tracker.autorun(()=>{
				this.ngZone.run(()=>{
					this.recipientImage = Users.find({'_id':recipient}).fetch()[0].profile.image;
				});
			});
		});
	}

	findLastMessage(conversation){
		Tracker.autorun(()=>{
			this.ngZone.run(()=>{
				// Get the last message of the messages array
				var messages = conversation.fetch()[0].messages;	
				this.lastMessage = messages[messages.length-1].message;
			});
		});
	}

	navigate(id){
		this.router.navigate(['/home/conversations/', id]);
	}


}