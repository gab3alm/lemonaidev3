import {Component, OnInit} from '@angular/core';
import {Meteor} from 'meteor/meteor';
import {MeteorComponent} from 'angular2-meteor';
import {ActivatedRoute, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {MaterializeDirective} from 'angular2-materialize';
import {ProjectsStream} from '../../../both/collections/projectsStream';
import {ProjectModel} from '../../../both/models/projects.stream.model';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import {IndividualTaskComponent} from './individual-task.component';


import template from './dynamic-task-view.html';
@Component({
  selector:'dynamictaskview',
  template,
  styleUrls:['styles/dynamictaskview.css'],
  directives:[ROUTER_DIRECTIVES, MaterializeDirective, IndividualTaskComponent]
})

export class DynamicTaskViewComponent extends MeteorComponent implements OnInit{  
  projectTasksID:string;
  projectTasks:Mongo.Cursor<ProjectModel>;
  pending:any;
  // NEW TASK PARAMETERS
  title:string;
  duedate:string;
  description:string;
  // PROJECT PARAMETERS
  active:boolean;
  visibility:boolean;
  allowed:boolean;

  constructor(public route:ActivatedRoute, public router:Router){
    super();
    this.route.params.subscribe(params=>{
      this.projectTasksID = params['area'];
    });
  }

  ngOnInit(){
    // Check whether the project is public or private
    this.call('checkProjectVisibility', this.projectTasksID, function(error, result){
      Session.set('allowed', result.permission);
    });
    this.allowed = Session.get('allowed')    

    this.subscribe('getProject', this.projectTasksID, ()=>{
      this.projectTasks = ProjectsStream.find({'_id':this.projectTasksID});
      // this.pending = ProjectsStream.find({'_id':this.projectTasksID}).fetch()[0].pending;
      this.active = this.visibility = this.projectTasks.fetch()[0].public;
    });
  }

  createTask(streamID:string, title:string, duedate:string, description:string){
    this.call('createNewTask', streamID, title, duedate, description);
  }

  changeProjectVisibility(projectID){
    this.call('checkProjectVisibility', this.projectTasksID, function(error, result){
      this.allowed = result.permission;
    });
    this.visibility = !this.visibility;
    this.call('changeProjectVisibility', projectID, this.visibility);
  }
}  