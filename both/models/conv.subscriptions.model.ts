export interface ConversationSubscriptionModel{
	owner:string;
	unread:number;
	conversations:Array<Message>;
}

export interface Message{
	sent:string;
	sender:string;
	message:string;
}