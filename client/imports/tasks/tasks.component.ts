import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {TaskPillsComponent} from './task-pills.component';

import template from './tasks.html';
@Component({
	selector:'tasks',
	template,
	styleUrls:['styles/tasks.css'],
	directives:[ROUTER_DIRECTIVES, TaskPillsComponent]
})

export class TasksComponent{}