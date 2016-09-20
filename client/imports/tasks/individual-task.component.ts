import {Component, Input} from '@angular/core';
import {MaterializeDirective} from 'angular2-materialize';

import template from './individual-task.html';
@Component({
  selector:'single-task',
  template,
  styleUrls:['styles/individualtask.css'],
  directives:[MaterializeDirective]
})

export class IndividualTaskComponent{
  @Input() task:any;
  constructor(){}
}