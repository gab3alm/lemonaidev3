export class Message{
	sent:Object; //Time message was sent
	sender:string; //Username of sender
	message:string; //heart of the class. The Message!

	constructor(s:Object, st:string, m:string){
		this.sent = s;
		this.sender = st;
		this.message = m;
	}

	getMessage(){
		return this.message;
	}

	getSender(){
		return this.sender;
	}

	getTime(){
		return this.sent;
	}
}