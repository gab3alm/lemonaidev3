export class Task{
	createdAt:string;
	assigner:string;
	title:string;
	description:string;
	dueDate:Object;
	status:string;

	constructor(createdDate:string, assigner:string, title:string, description:string, due:Object){
		this.createdAt = createdDate;
		this.assigner = assigner;
		this.title = title;
		this.description = description;
		this.dueDate = due;
		this.status = 'pending';
	}
}