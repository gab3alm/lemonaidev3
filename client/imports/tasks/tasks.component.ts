import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {TaskpillComponent} from './taskpills.component';

import template from './tasks.html';
@Component({
	selector:'tasks',
	template,
	styleUrls:['styles/tasks.css'],
	directives:[ROUTER_DIRECTIVES, TaskpillComponent]
})

export class TasksComponent{}