import {Component, Input} from '@angular/core';
// import {Person} from '../../../classes/person';
import {MaterializeDirective} from "angular2-materialize";
import {NgClass} from '@angular/common';
import {NgForm} from '@angular/forms';
import {ConversationStreams} from '../../../both/collections/conversationStream';
import {ConversationSubscriptions} from '../../../both/collections/conversationSubscriptions';
import {Users} from '../../../both/collections/users';
import {Meteor} from 'meteor/meteor';
import {MeteorComponent} from 'angular2-meteor';
import {Message} from '../../../both/classes/message';
import '../../../both/collections/methods';

import template from './studentcard.html';
@Component({
	selector:'student-card',
	directives:[MaterializeDirective, NgClass, NgForm],
	template,
	styleUrls:['styles/studentcard.css']
})

export class StudentCardComponent extends MeteorComponent{
	@Input() student:any;
	conversationTitle:string = '';
	message:string = '';
	flipIt = false;
	defaultIt = true;

	constructor(){
		super();
	}

	// Flips card to message creation side
	Flip(){
		this.flipIt = !this.flipIt;
	}

	// Flips card to Student information Display
	resetCard(){
		this.flipIt = !this.flipIt;
		this.defaultIt = !this.defaultIt;
		setTimeout(func => this.defaultIt = !this.defaultIt , 1000);
		this.message = this.conversationTitle = "";
	}

	// Sends message to student
	sendMessage(){
		// Send message if it's not empty
		if(this.message != ''){
			// this.createNewConversation(this.conversationTitle, Meteor.userId(), this.student._id, this.message);
			this.call('createNewConversation', 
				this.conversationTitle, 
				Meteor.userId(), 
				this.student._id, 
				this.message);
		}
		this.resetCard();
	}
}