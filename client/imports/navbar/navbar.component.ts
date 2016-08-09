import {Component, Input, NgZone} from '@angular/core';
import {Mongo} from 'meteor/mongo';
import {UserAvatar} from './user-avatar.component';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Session} from 'meteor/session';
import {MeteorComponent} from 'angular2-meteor';
import {Users} from '../../../both/collections/users';
import {ConversationSubscriptions} from '../../../both/collections/conversationSubscriptions';

import template from './navbar.html';
@Component({
	selector:'lemonaide-navbar',
	directives:[UserAvatar, ROUTER_DIRECTIVES],
	template,
	styleUrls:['styles/navbar.css']
})

export class NavbarComponent extends MeteorComponent{
	currUser: Mongo.Cursor<Object>;
	unreadMessages:number = 0;
	unreadTasks:number = 0;
	constructor(public router: Router){
		super();
		this.subscribe('user', Meteor.userId(), ()=>{
			this.currUser = Users.find({"_id":Meteor.userId()});
			var convsubRef = this.currUser.fetch()[0].profile.conversationSubs;
			
			this.subscribe('conversationSubscriptions', convsubRef, ()=>{
				// Make the fetch reactive.(conversationSubscription - unread field)
				this.autorun(()=>{
					this.unreadMessages = ConversationSubscriptions.find({'_id':convsubRef}).fetch()[0].unread;
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
