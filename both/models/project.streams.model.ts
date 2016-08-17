export interface ProjectModel{
	owner:string;
	projects:Array<Project>;
}

interface Project{
	createdDate:string;
	creator:string;
	title:string;
	dueDate:string;
	pending:Array<Task>;
	progress:Array<Task>;
	completed:Array<Task>;
}

interface Task{
	created:string;
	creator:string;
	recipient:string;
	title:string;
	description:string;
	status:string;
}