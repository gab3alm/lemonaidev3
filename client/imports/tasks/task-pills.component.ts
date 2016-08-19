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
import {ProjectSubscriptions} from '../../../both/collections/projectSubscriptions';

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
  // ID's for user projects
  personalTaskStreamID:string;  
  projectSubscriptions:Array<string>;  
  // NEW TASK FIELDS
  recipientType:string;
  recipientID:string;
  taskTitle:string;
  taskDescription:string;
  taskDuedate:string;

  constructor(public router:Router, public ngZone:NgZone){
    super();
  }

  ngOnInit(){
    this.subscribe('everyone',()=>{
      this.studentRecipients = Users.find({'profile.category':'student'});
      this.staffRecipients = Users.find({'profile.category':'staff'});
      
      //||||||||||||||||||||||||||||||||||||||||
      // Get user's personal tasks and projects IDs
      //||||||||||||||||||||||||||||||||||||||||
      this.personalTaskStreamID = Users.find({'_id':Meteor.userId()}).fetch()[0].profile.personalTasks;
      var projectSubscriptionsID = Users.find({'_id':Meteor.userId()}).fetch()[0].profile.projectSubs;
      this.subscribe('getProjectSubscriptions', projectSubscriptionsID, ()=>{
        this.projectSubscriptions = ProjectSubscriptions.find({'_id':projectSubscriptionsID}).fetch()[0].projects;
      });


    });

  }

  navigate(area){
    this.router.navigate(['/home/tasks/', area]);
  }

}  