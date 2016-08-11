import {Component, OnInit, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ConversationStreams} from '../../../both/collections/conversationStream';
import {Meteor} from 'meteor/meteor';
import {MeteorComponent} from 'angular2-meteor';
import {Tracker} from 'meteor/tracker';
import {Users} from '../../../both/collections/users';
import {NgForm} from '@angular/forms';
import {Message} from '../../../both/classes/message';
import {moment} from 'meteor/momentjs:moment';
import '../../../both/collections/methods';

import template from './dynamicmessages.html';
@Component({
	selector:'dynamicmessages',
	template,
	styleUrls:['styles/dynamicmessages.css'],
	directives:[NgForm]
})

export class DynamicMessagesComponent extends MeteorComponent implements OnInit{
	sender:string;
	conversationID:string;
	conversationTitle:string;
	messages:Object;
	reply:string;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private ngZone:NgZone){
		super();
	}


	ngOnInit(){
		this.route.params.subscribe(params =>{
			this.conversationID = params['id'];
			this.subscribe('conversationStream', this.conversationID, ()=>{
				Tracker.autorun(()=>{
					this.ngZone.run(()=>{
						this.messages = ConversationStreams.find({'_id':this.conversationID}).fetch()[0].messages;
						this.conversationTitle = ConversationStreams.find({'_id':this.conversationID}).fetch()[0].title;
					});
				});
			}, true);
		});
	}


	sendMessage(conversationID, message){
		this.call('sendMessage', conversationID, Meteor.userId(), message);
		this.reply = '';
	}
}