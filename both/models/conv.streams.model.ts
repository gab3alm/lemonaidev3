export interface ConversationStreamsModel{
	title:string;
	created:Object;
	subscribers:Array<Subscribers>;
	messages:Array<Message>;
}

interface Subscribers{
	user:string;
	unread:number;
	subscribed:number;
}

interface Message{
	sent:Object; //Time message was sent
	sender:string; //Username of sender
	message:string; //Message!
}