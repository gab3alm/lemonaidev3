import {Component,Input, OnInit} from '@angular/core';
import {MaterializeDirective} from 'angular2-materialize';
import {NgForm} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Users} from '../../../both/collections/users';
import {Mongo} from 'meteor/mongo';
import {Session} from 'meteor/session';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {MeteorComponent} from 'angular2-meteor';
import {Meteor} from 'meteor/meteor';
import '../../../both/collections/conversation-methods';

import template from './staff-pill.html';
@Component({
	selector:'staff-pills',
	directives:[MaterializeDirective, NgForm, NgClass, ROUTER_DIRECTIVES],
	template,
	styleUrls:['styles/staffpill.css']
})

export class StaffpillComponent extends MeteorComponent implements OnInit{
	stafflist: Mongo.Cursor<Object>;

	message:string = '';
	conversationTitle = '';
	constructor(public router:Router){
		super();
	}

	ngOnInit(){
		this.subscribe('getStaff', ()=>{
			this.stafflist = Users.find({"profile.category":'staff'});
		});
	}
	cancelMessage(){
		this.message = '';
	}

	sendMessage(title:string, recipient:string, message:string){
		this.call('createNewConversation', title, Meteor.userId(), recipient, message);
		this.message = '';
	}

	navigate(username){
		this.router.navigate(['home/directory', username]);
	}
}
