import {Component, Input} from '@angular/core';
// import {Person} from '../../../classes/person';
import {MaterializeDirective} from 'angular2-materialize';
import {NgForm} from '@angular/forms';
import {Users} from '../../../both/collections/users';
import {Session} from 'meteor/session';
import {Meteor} from 'meteor/meteor';

import template from './user-avatar.html';
@Component({
	selector:'user-avatar',
	directives:[MaterializeDirective, NgForm],
	template,
	styleUrls:['styles/useravatar.css']
})

export class UserAvatar{
	@Input() user:Object;
	timeoutReason: string ='';

	constructor(){}

	// methods will be replaced with services that talk to database directly
	StepOut(){
		Users.update({"_id":Meteor.userId()}, {$set : 
			{"profile.leaveReason":this.timeoutReason}
		});
	}

	StepIn(){
		Users.update({"_id":Meteor.userId()}, {$set : 
			{"profile.leaveReason":''}
		});
	}

}
