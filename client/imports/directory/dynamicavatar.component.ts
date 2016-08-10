import {Component, Input} from '@angular/core';

import template from './dynamicavatar.html';
@Component({
	selector:'dynamic-avatar',
	template,
	styleUrls:['styles/dynamicavatar.css']
})

export class DynamicAvatarComponent{
	@Input() staff:any;
}