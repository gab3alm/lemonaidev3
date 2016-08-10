export interface TaskStreamsModel{
	owner:string;
	unread:number;
	pending:Array<Object>;
	progress:Array<Object>;
	completed:Array<Object>;
}