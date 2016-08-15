export interface ConversationSubscriptionModel{
	_id:string;
	owner:string;
	unread:number;
	conversations:Array<Object>;
}