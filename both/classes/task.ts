export class Task{
	createdDate:Object;
	sender:string;
	recipient:string;
	title:string;
	description:string;
	dueDate:Object;
	status:string;

	constructor(createdDate:Object, sender:string, recipient:string, title:string, description:string, due:Object){
		this.createdDate = createdDate;
		this.sender = sender;
		this.recipient = recipient;
		this.title = title;
		this.description = description;
		this.dueDate = due;
		this.status = 'pending';
	}
}