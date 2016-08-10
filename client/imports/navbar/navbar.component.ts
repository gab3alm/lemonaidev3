import {Component, Input, NgZone, OnInit} from '@angular/core';
import {Mongo} from 'meteor/mongo';
import {UserAvatar} from './user-avatar.component';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Session} from 'meteor/session';
import {MeteorComponent} from 'angular2-meteor';
import {Users} from '../../../both/collections/users';
import {ConversationSubscriptions} from '../../../both/collections/conversationSubscriptions';
import {UserModel} from '../../../both/models/user.model';


import template from './navbar.html';
@Component({
	selector:'lemonaide-navbar',
	directives:[UserAvatar, ROUTER_DIRECTIVES],
	template,
	styleUrls:['styles/navbar.css']
})

export class NavbarComponent extends MeteorComponent implements OnInit{
	currUser: Mongo.Cursor<Object>;
	unreadMessages:number;
	unreadTasks:number;
	
	constructor(public router: Router, private ngZone:NgZone){
		super();
	}

	ngOnInit(){
		this.subscribe('user', Meteor.userId(), ()=>{
			this.currUser = Users.find({"_id":Meteor.userId()});
			var convsubRef = Users.find({"_id":Meteor.userId()}).fetch()[0].profile.conversationSubs;
			this.subscribe('conversationSubscriptions', convsubRef, ()=>{
				// Make the fetch reactive.(conversationSubscription - unread field)
				this.autorun(()=>{
					this.ngZone.run(()=>{
						this.unreadMessages = ConversationSubscriptions.find({'_id':convsubRef}).fetch()[0].unread;
					});
				}, true);
			});
		});
	}

	logout(){
		Users.update({'_id':Meteor.userId()}, {$set : 
			{'profile.presence': 0}
		});
		Session.set("USERNAME", "");
		this.router.navigate(['/']);
	}
}
