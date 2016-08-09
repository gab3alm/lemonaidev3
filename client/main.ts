import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {Component, enableProdMode} from '@angular/core';

@Component({
	selector:'lemonaide',
	template:'<p>Welcome to Lemonaide</p>'
})

class Main{}

enableProdMode();
bootstrap(Main);