import {RouterConfig, provideRouter} from '@angular/router';
import {LoginComponent} from './imports/login/login.component';
import {RegistrationComponent} from './imports/registration/registration.component';
import {HomeComponent} from './imports/home/home.component';
import {WelcomeComponent} from './imports/welcome/welcome.component';
import {DirectoryComponent} from './imports/directory/directory.component';
import {LiveviewComponent} from './imports/directory/liveview.component';
import {DynamicviewComponent} from './imports/directory/dynamicview.component';
import {ConversationsComponent} from './imports/conversations/conversations.component';
import {BlankComponent} from './imports/conversations/blank.component';
import {DynamicMessagesComponent} from './imports/conversations/dynamic-messages.component';
import {TasksComponent} from './imports/tasks/tasks.component';
import {DynamicTaskViewComponent} from './imports/tasks/dynamic-task-view.component';

export const routes : RouterConfig = [
	{path:'', component:LoginComponent},
	{path:'registration', component:RegistrationComponent},
	{path:'home', component:HomeComponent, children:[
		{path:'', component:WelcomeComponent},
		{path:'directory', component:DirectoryComponent, children:[
			{path:'', component:LiveviewComponent},
			{path:':username', component:DynamicviewComponent}
		]},
		{path:'conversations', component:ConversationsComponent, children:[
			{path:'', component:BlankComponent}, 
			{path:':id', component:DynamicMessagesComponent}
		]},
		{path:'tasks', component:TasksComponent, children:[
			// {path:'', component:BlankComponent},
			// {path:':area', component: DynamicTaskViewComponent}
		]},
		{path:'help', component: WelcomeComponent}
	]}
];

export const APP_ROUTES = [provideRouter(routes)];