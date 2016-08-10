import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import template from './welcome.html';
@Component({
	selector:'welcome-section',
	directives:[ROUTER_DIRECTIVES],
	template,
	styleUrls:['styles/welcome.css']
})

export class WelcomeComponent{}