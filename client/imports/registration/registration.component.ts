import {Component, OnInit} from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CapitalizePipe} from '../pipes/capitalize';
import {NgForm} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Accounts} from 'meteor/accounts-base';
import {MeteorComponent} from 'angular2-meteor';
import {ConversationSubscriptions} from '../../../both/collections/conversationSubscriptions';
import {TaskStreams} from '../../../both/collections/taskStream';
import {Users} from '../../../both/collections/users';
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';


import template from './registration.html';
@Component({
	selector:'lemonaide-registration',
	template,
	styleUrls:['styles/registration.css'],
	directives:[ROUTER_DIRECTIVES, MaterializeDirective, NgForm, NgClass],
	pipes:[CapitalizePipe]
})

export class RegistrationComponent extends MeteorComponent implements OnInit{
	// NEW USER FIELDS
	// present in registration form
	username:string;
	password:string;
	password2:string;
	category:string;
	firstname:string;
	lastname:string;
	department:string;
	title:string;
	supervisor:string;
	securityQuestion:string;
	securityAnswer:string;

	// NEW USER FIELDS
	// not present in registration form
	image:string; //path to users image
	image2:string; // path to transparent image
	presence:number = 0; // 0-!present | 1-present
	leaveReason:string; //Reason when user takes break
	conversationSubscriptions:string = ''; //reference to user's conversations subscriptions
	taskSubscriptions:string = ''; //reference to user's tasks subscriptions

	// SELECT FORM FIELD VALUES
	// need to populate these fields with options from mongo collections
	categoryOptions = ['staff', 'student'];
	departmentOptions = ['multimedia', 'testing'];
	supervisorOptions: Mongo.Cursor<Object>;

	// FORM ERROR MARKERS
	existing:boolean = false;
	success:boolean = false;

	constructor(private router:Router){
		super();
	}

	ngOnInit(){
		this.subscribe('StaffNames', ()=>{
			this.supervisorOptions = Users.find();
		}, true);
	}

	registerUser(){
		// Creating new user.
		// If the user creation function is successful, then user is automatically
		// logged in METEOR. Now we can update the conversationSubs and taskSubs
		this.createImagePaths();
		Accounts.createUser({
			username:this.username,
			password:this.password,
			profile:{
				category:this.category,
				image:this.image,
				image2:this.image2,
				firstname:this.firstname,
				lastname:this.lastname,
				title:this.title,
				department:this.department,
				supervisor:this.supervisor,
				presence:this.presence,
				leaveReason:this.leaveReason,
				conversationSubs:this.conversationSubscriptions,
				taskSubs:this.taskSubscriptions,
				securityQuestion:this.securityQuestion,
				securityAnswer:this.securityAnswer
			}
		}, err=>{
			// Callback of user creation operation
			if(err){
				// The new user creation operation was not successful.
				console.log(err);
				this.existing = true;
			}else{
				//user creation success, now
				//create a place for all the user conversation subscriptions
				//create a place for all the user tasks
				this.createConversationSubscription();
				this.createTaskStream();
				this.success = true;
			}
		});
	}

	createImagePaths(){
		var first = this.firstname.trim().replace(' ','_');
		var last = this.lastname.trim().replace(' ','_');
		if(this.category == 'student'){
			this.image = 'users/students/'+ first +"_"+ last +".jpg";
			this.image2 = 'users/students/'+ first +"_"+ last +"_opacity.jpg";
		}else if(this.category == 'staff'){
			this.image = 'users/staff/' + first + "_" + last + '.jpg';
			this.image2 = 'users/staff/' + first + "_" + last + '_opacity.jpg';
		}else{
			// I dont know
		}
	}

	createConversationSubscription(){
		ConversationSubscriptions.insert({
			owner:this.username,
			unread:0,
			conversations:[]
		},(err, insertionID)=>{
			// callback
			if(err){
				// ID of conversationSubscrition created
				console.log("Error: " + err);
			}else{
				// creation of conversation subscriptions was successful
				// update the user field
				Users.update({"_id":Meteor.userId()}, {$set: 
					{'profile.conversationSubs':insertionID}
				});
			}
		});
	}


	createTaskStream(){
		TaskStreams.insert({
			owner:this.username,
			unread:0,
			pending:[],
			progress:[],
			completed:[]
		}, (err, insertionID)=>{
			// callback
			if(err){
				// ID of conversationSubscrition created
				console.log("Error: " + err);
			}else{
				// creation of conversation subscriptions was successful
				// update the user field
				Users.update({"_id":Meteor.userId()}, {$set: 
					{'profile.taskSubs':insertionID}
				});
			}
		});
	}
}
