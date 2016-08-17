import {Component, Input, OnInit} from '@angular/core';
import {MaterializeDirective} from 'angular2-materialize';
import {MeteorComponent} from 'angular2-meteor';
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Users} from '../../../both/collections/users';
import {TaskStreams} from '../../../both/collections/taskStream';


import template from './individualtask.html';
@Component({
	selector:'individual-task',
	template,
	styleUrls:['styles/individualtask.css'],
	directives:[MaterializeDirective]
})


export class IndividualtaskComponent extends MeteorComponent implements OnInit{
	@Input() task:Object;
	currusername:string;
	taskStreamID:string;
	constructor(){
		super();
	}

	ngOnInit(){
		this.subscribe('user', Meteor.userId(), ()=>{
			this.taskStreamID = Users.find({"_id":Meteor.userId()}).fetch()[0].profile.taskSubs;
			var first = Users.find({"_id":Meteor.userId()}).fetch()[0].profile.firstname;
			var last = Users.find({"_id":Meteor.userId()}).fetch()[0].profile.lastname;
			this.currusername = first + " " + last;
		});
	}

	deleteTask(taskStreamID, status, date, sender){
		// Status was not working as a parameter so had to separate it into conditionals
		if(status == 'pending'){
			TaskStreams.update({'_id':taskStreamID},{$pull:{'pending':{'createdDate':date, 'sender':sender}}});
		}else if(status == 'progress'){
			TaskStreams.update({'_id':taskStreamID},{$pull:{'progress':{'createdDate':date, 'sender':sender}}});
		}else if(status == 'completed'){
			TaskStreams.update({'_id':taskStreamID},{$pull:{'completed':{'createdDate':date, 'sender':sender}}});
		}
	}

	updateTaskStatus(taskStreamID, status, date, sender, newStatus){
		console.log(taskStreamID + " " + status + " " + date + " " + sender + " " + newStatus);
		this.subscribe('taskstream', ()=>{
			var element = TaskStreams.find({'_id':taskStreamID}).fetch()[0];
			var taskStream = this.getTaskStream(element, status);
			var selectedTask = this.getTask(taskStream, date, sender);
			selectedTask.status = newStatus;
			this.insertUpdatedTask(taskStreamID, newStatus, selectedTask);
			this.deleteTask(taskStreamID, status, date, sender);
		});
	}

	getTaskStream(element, status){
		if(status == 'pending'){
			return element.pending;
		}else if(status == 'progress'){
			return element.progress;
		}else{
			return element.completed;
		}
	}	

	getTask(taskStream, datecreated, sender){
		for(var i = 0; i < taskStream.length; i++){
			if(taskStream[i].createdDate == datecreated && taskStream[i].sender == sender ){
				return taskStream[i];
			}
		}
	}

	insertUpdatedTask(taskStreamID, newStatus, task){
		if(newStatus == 'pending'){
			TaskStreams.update({'_id':taskStreamID}, {$addToSet:{
				'pending':task
			}});
		}else if(newStatus == 'progress'){
			TaskStreams.update({'_id':taskStreamID}, {$addToSet:{
				'progress':task
			}});
		}else{
			TaskStreams.update({'_id':taskStreamID}, {$addToSet:{
				'completed':task
			}});
		}

	}

}