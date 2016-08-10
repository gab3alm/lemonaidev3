import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {StaffpillComponent} from './staff-pill.component';

import template from './directory.html';
@Component({
	selector:'directory',
	template,
	styleUrls:['styles/directory.css'],
	directives:[ROUTER_DIRECTIVES, StaffpillComponent]
})

export class DirectoryComponent{}