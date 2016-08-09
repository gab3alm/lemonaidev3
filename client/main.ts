import 'reflect-metadata';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {Component, enableProdMode} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {APP_ROUTES} from './router';

import template from './main.html';
@Component({
	selector:'lemonaide',
	template,
	directives:[ROUTER_DIRECTIVES]
})

class Main{}

// enableProdMode();
bootstrap(Main, [
	APP_ROUTES,
  disableDeprecatedForms(),
  provideForms()
 ])
 .catch((err: any) => console.error(err));