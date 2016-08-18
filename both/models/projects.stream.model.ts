export interface ProjectModel{
	createdAt:string;
	creator:string;
	title:string;
	dueDate:string;
	pending:Array<Task>;
	progress:Array<Task>;
	completed:Array<Task>;
	public:boolean;
	allowed:Array<string>;
}

interface Task{
	createdAt:string;
	sender:string;
	recipient:string;
	title:string;
	description:string;
	dueDate:string;
	status:string;
}

