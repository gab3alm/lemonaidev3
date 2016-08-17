import {Component, OnInit, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {MeteorComponent} from 'angular2-meteor';
import {TaskStreams} from '../../../both/collections/taskStream';
import {Users} from '../../../both/collections/users';
import {Tracker} from 'meteor/tracker';
import {IndividualtaskComponent} from './Individualtask.component';

import template from './dynamictasks.html';
@Component({
	selector:'dynamic-tasks',
	template,
	styleUrls:['styles/dynamictasks.css'],
	directives:[IndividualtaskComponent]
})

export class DynamicTasksComponent extends MeteorComponent implements OnInit{
	area:string;
	// Tasks categories
	pendingTasks = [];
	progressTasks = [];
	completedTasks = [];

	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private ngZone:NgZone){
		super();
	}

	ngOnInit(){
		this.route.params.subscribe(params =>{
			this.area = params['area'];
		});

		this.subscribe('user', Meteor.userId(), ()=>{
			var userTaskSubs = Users.find({'_id':Meteor.userId()}).fetch()[0].profile.taskSubs;
			this.subscribe('taskstream', ()=>{
				Tracker.autorun(()=>{
					this.ngZone.run(()=>{
						this.pendingTasks = TaskStreams.find({'_id':userTaskSubs}).fetch()[0].pending;
						this.progressTasks = TaskStreams.find({'_id':userTaskSubs}).fetch()[0].progress;
						this.completedTasks = TaskStreams.find({'_id':userTaskSubs}).fetch()[0].completed;
					});
				});
			});	
		});
	}


}