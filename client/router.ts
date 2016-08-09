import {RouterConfig, provideRouter} from '@angular/router';
import {LoginComponent} from './imports/login/login.component';


const routes: RouterConfig = [
	{path:'',component:LoginComponent}
];

export const APP_ROUTES = [provideRouter(routes)];