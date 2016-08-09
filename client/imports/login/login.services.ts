import {Meteor} from 'meteor/meteor';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Session} from 'meteor/session';

@Injectable()
export class LoginServices{
	constructor(private router:Router){}
	// Meteor Method - API 
	// (http://docs.meteor.com/api/accounts.html#Meteor-loginWithPassword)
	public validateLogin(username:string, password:string){
		Meteor.loginWithPassword(username, password, err=>{
			if(!err){
				this.router.navigate(['home']);
			}
		});
	}
}