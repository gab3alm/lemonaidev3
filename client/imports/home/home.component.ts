import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';

import template from './home.html';
@Component({
	selector:'home',
	template,
	styleUrls:['styles/home.css'],
	directives:[ROUTER_DIRECTIVES, NavbarComponent, FooterComponent]
})

export class HomeComponent{}