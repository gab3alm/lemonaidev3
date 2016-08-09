import {RouterConfig, provideRouter} from '@angular/router';
import {LoginComponent} from './imports/login/login.component';
import {HomeComponent} from './imports/home/home.component';

const routes: RouterConfig = [
	{path:'',component:LoginComponent},
	{path:'home', component:HomeComponent}
];

export const APP_ROUTES = [provideRouter(routes)];