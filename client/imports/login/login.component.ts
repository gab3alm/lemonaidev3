import {NgClass} from '@angular/common';
import {Component} from '@angular/core';
import {Users} from '../../../both/collections/users';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {LoginServices} from './login.services';

import template from './login.html';
@Component({
	selector:'lemonaide-login',
	template,
	styleUrls:['styles/login.css'],
	directives:[ROUTER_DIRECTIVES, NgForm, NgClass],
	providers:[LoginServices]
})

export class LoginComponent{
	// LOGIN FORM VALUES
	username:string;
	password:string;
	// FORM ERRORS VALUES	
	incorrect:boolean = false;
	movement:boolean = false;

	constructor(public router:Router,
		public LoginServices:LoginServices){}

	validateLogin(username, password){
		this.LoginServices.validateLogin(username, password);
		setTimeout(()=>{
			// Makes the error message visible to the user
			this.incorrect = this.movement = true;
			// Reset the movement so that another failed attempt triggers the animation
			setTimeout(()=>this.movement = false,800);
		}, 800);
	}

}