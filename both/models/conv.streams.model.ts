export interface ConversationStreamsModel{
	title:string;
	created:Object;
	subscribers:Array<Subscribers>;
	messages:Array<Message>;
}

export interface Subscribers{
	user:string;
	unread:number;
	subscribed:number;
}

export interface Message{
	sent:Object; //Time message was sent
	sender:string; //Username of sender
	message:string; //Message!
}