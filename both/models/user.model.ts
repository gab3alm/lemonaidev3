export interface UserModel {
	username:string;
	password:Object;
	profile: profileOption;

}

interface profileOption{
	[index:number]:string
}