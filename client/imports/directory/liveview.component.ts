import {Component, OnInit} from '@angular/core';
import {Mongo} from 'meteor/mongo';
import {Users} from '../../../both/collections/users';
import {StudentCardComponent} from '../studentcard/studentcard.component';
import {Meteor} from 'meteor/meteor';
import {MeteorComponent} from 'angular2-meteor';

import template from './liveview.html';
@Component({
	selector:'live-view',
	directives:[StudentCardComponent],
	template,
	styleUrls:['styles/liveview.css']
})

export class LiveviewComponent extends MeteorComponent implements OnInit{
	StudentsPresent : Mongo.Cursor<Object>;
	constructor(){
		super();
	}

	ngOnInit(){
		this.subscribe('PresentStudents', ()=>{
			this.StudentsPresent = Users.find({"profile.category":"student", 'profile.presence':1});
		});
	}
}