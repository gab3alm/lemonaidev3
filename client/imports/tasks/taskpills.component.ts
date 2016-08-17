import {Component, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {MaterializeDirective} from 'angular2-materialize';
import {Meteor} from 'meteor/meteor';
import {MeteorComponent} from 'angular2-meteor';
import {Users} from '../../../both/collections/users';
import {Mongo} from 'meteor/mongo';
import {NgForm} from '@angular/forms';
import {moment} from 'meteor/momentjs:moment';
import {TaskStreams} from '../../../both/collections/taskStream';
import {Task} from '../../../both/classes/task';

import template from './taskpill.html';
@Component({
	selector:'taskpills',
	template,
	styleUrls:['styles/taskpill.css'],
	directives:[MaterializeDirective, NgForm]
})

export class TaskpillComponent extends MeteorComponent implements OnInit{
	studentRecipients:Mongo.Cursor<Object>;
	staffRecipients:Mongo.Cursor<Object>;
	recipientUser:Mongo.Cursor<Object>;
	// NEW TASK FIELDS
	recipientType:string;
	recipientID:string;
	taskTitle:string;
	taskDescription:string;
	taskDuedate:Date;

	constructor(public router:Router, public ngZone:NgZone){
		super();
	}

	ngOnInit(){
		this.subscribe('everyone',()=>{
			this.studentRecipients = Users.find({'profile.category':'student'});
			this.staffRecipients = Users.find({'profile.category':'staff'});
		});
	}

	navigate(area){
		this.router.navigate(['/home/tasks/', area]);
	}

	sendTask(){
		var dateCreated = moment().format('MMMM Do YYYY, h:mm:ss a');
		this.subscribe('everyone', ()=>{
			// get sender name
			var senderFirst = Users.find({'_id':Meteor.userId()}).fetch()[0].profile.firstname;	
			var senderLast = Users.find({'_id':Meteor.userId()}).fetch()[0].profile.lastname;	
			var senderName = senderFirst + " " + senderLast;
			// get recipient name and the recipient taskSubs ID
			var recipientName = '';
			var recipientTaskSubs = '';
			var senderTaskSubs = '';
			if(this.recipientType != 'myself'){
				var recipientFirst = Users.find({'_id':this.recipientID}).fetch()[0].profile.firstname;	
				var recipientLast = Users.find({'_id':this.recipientID}).fetch()[0].profile.lastname;	
				recipientName = recipientFirst + " " + recipientLast;
				recipientTaskSubs = Users.find({'_id':this.recipientID}).fetch()[0].profile.taskSubs;
				senderTaskSubs = Users.find({'_id':Meteor.userId()}).fetch()[0].profile.taskSubs;
			}else{
				recipientName = senderName;
				recipientTaskSubs = Users.find({'_id':Meteor.userId()}).fetch()[0].profile.taskSubs;
			}

			var newTask = new Task(dateCreated, senderName, recipientName, this.taskTitle, this.taskDescription, this.taskDuedate);	
			if(this.recipientType == 'myself'){
				// update the user only
				this.insertTask(newTask, recipientTaskSubs);
			}else{
				// update user and recipient
				this.insertTask(newTask, recipientTaskSubs);
				this.insertTask(newTask, senderTaskSubs);
			}
		});
	}


	insertTask(Task, ID){
		TaskStreams.update({'_id':ID}, {
			$inc: {'unread':1},
			$addToSet: {'pending':Task}
		});
	}

}	