import {Meteor} from 'meteor/meteor';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Session} from 'meteor/session';
import {Users} from '../../../both/collections/users';

@Injectable()
export class LoginServices{
	constructor(private router:Router){}
	// Meteor Method - API 
	// (http://docs.meteor.com/api/accounts.html#Meteor-loginWithPassword)
	public validateLogin(username:string, password:string){
		Meteor.loginWithPassword(username, password, err=>{
			if(!err){
				Session.set('USERNAME',username);
				Users.update({"_id":Meteor.userId()}, {$set: {
					'profile.presence':1
				}});
				this.router.navigate(['home']);
			}
		});
	}
}