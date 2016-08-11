import {Component, OnInit, NgZone} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {ConversationpillComponent} from './conversation-pill.component';
import {Users} from '../../../both/collections/users';
import {ConversationSubscriptions} from '../../../both/collections/conversationSubscriptions';
import {MeteorComponent} from 'angular2-meteor';
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {MaterializeDirective} from 'angular2-materialize';
import {NgForm} from '@angular/forms';
import {CapitalizePipe} from '../pipes/capitalize';
import '../../../both/collections/methods';

import template from './conversations.html';
@Component({
	selector:'conversations',
	template,
	styleUrls:['styles/conversations.css'],
	directives:[ROUTER_DIRECTIVES, ConversationpillComponent, MaterializeDirective, NgForm],
	pipes:[CapitalizePipe]
})

export class ConversationsComponent extends MeteorComponent implements OnInit{
	userConversations: Array<Object>;

	// MESSAGE RECIPIENT CATEGORY
	messageCategory: string;
	staffSelection: Mongo.Cursor<Object>;
	studentSelection: Mongo.Cursor<Object>;

	// NEW CONVERSATION FIELDS
	recipientID:string;
	conversationTitle:string;
	conversationMessage:string;


	constructor(public ngZone:NgZone){
		super();
	}

	ngOnInit(){
		this.subscribe('user', Meteor.userId(), ()=>{
			var ref = Users.find({'_id':Meteor.userId()}).fetch()[0].profile.conversationSubs;
			this.getConversations(ref);	
		}, true);

		this.subscribe('everyone', ()=>{
			this.staffSelection = Users.find({'profile.category':'staff'});
			this.studentSelection = Users.find({'profile.category':'student'});
		});	
	}

	getConversations(ref){
		this.subscribe('conversationSubscriptions', ref, ()=>{
			Tracker.autorun(()=>{
				this.ngZone.run(()=>{
					this.userConversations = ConversationSubscriptions.find({'_id':ref}).fetch()[0].conversations;
				});
			});
		}, true);
	}

	setMessageCategory(category){
		this.messageCategory = category;
	}

	createNewConversation(recipient:string, title:string, message:string){
		this.call('createNewConversation', title, Meteor.userId(), recipient, message);
	}

}