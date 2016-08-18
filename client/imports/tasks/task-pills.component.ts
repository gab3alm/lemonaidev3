import {Component, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {MaterializeDirective} from 'angular2-materialize';
import {Meteor} from 'meteor/meteor';
import {MeteorComponent} from 'angular2-meteor';
import {Users} from '../../../both/collections/users';
import {Mongo} from 'meteor/mongo';
import {NgForm} from '@angular/forms';
import {moment} from 'meteor/momentjs:moment';
// import {TaskStreams} from '../../../both/collections/taskStream';
import {Task} from '../../../both/classes/task';

import template from './task-pills.html';
@Component({
  selector:'task-pills',
  template,
  styleUrls:['styles/taskpill.css'],
  directives:[MaterializeDirective, NgForm]
})

export class TaskPillsComponent extends MeteorComponent implements OnInit{
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

}  