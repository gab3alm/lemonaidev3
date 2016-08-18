export class Task{
	createdAt:Object;
	sender:string;
	recipient:string;
	title:string;
	description:string;
	dueDate:Object;
	status:string;

	constructor(createdDate:Object, sender:string, recipient:string, title:string, description:string, due:Object){
		this.createdAt = createdDate;
		this.sender = sender;
		this.recipient = recipient;
		this.title = title;
		this.description = description;
		this.dueDate = due;
		this.status = 'pending';
	}
}