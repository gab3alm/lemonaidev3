import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Mongo} from 'meteor/mongo';
import {Users} from '../../../both/collections/users';
import {StudentCardComponent} from '../studentcard/studentcard.component';
import {DynamicAvatarComponent} from './dynamicavatar.component';
import {MeteorComponent} from 'angular2-meteor';

import template from './dynamicview.html';
@Component({
	selector:'dynamic-view',
	template,
	styleUrls:['styles/dynamicview.css'],
	directives:[StudentCardComponent, DynamicAvatarComponent]
})

export class DynamicviewComponent extends MeteorComponent implements OnInit, OnDestroy{
	StudentList: Mongo.Cursor<Object>;
	Staff: Mongo.Cursor<Object>;
	supervisor:string;

	constructor( 
		private route: ActivatedRoute,
		private router: Router){
		super();
	}

	ngOnInit(){
		this.route.params.subscribe(params =>{
			this.supervisor = params['username'];
			this.subscribe('getStaffStudents', this.supervisor,  ()=>{
				this.StudentList = Users.find({'profile.supervisor':this.supervisor});
			});	 		
			this.subscribe('getSingleStaff', this.supervisor, ()=>{
				this.Staff = Users.find({'username':this.supervisor});
			});
		});

	}

	ngOnDestroy() {
		// this.sub.unsubscribe();
	 	// console.log("destroyed");
	 }
	}