import{NotificationsModal} from './notifications.modal'
export interface IAccountModal{
id:string;
name:string;
type:string;
level:number;
notes:{
    userNotes:NotificationsModal[]
}
userNotes:NotificationsModal[];
tasks:Tasks[];
userStatus:string;
systemStatus:string;
createdAt:number;
modifiedBy:string;
userName:string;
password:string;
contact:string;
types:string[];
companyName:string;
companySize:string;
advertiserGroup:AdvertiserGroup[];
accessToken:AccessToken;
accountType:string;
}
export interface AccessToken{
createdAt:number;
expiredAt:number;
key:string;
}
export interface AdvertiserGroup{
type:string;
level:number;
notes:Notes;
tasks:Tasks;
userStatus:string;
systemStatus:string;
members:string[];

}
export interface Notes{

}
export interface Tasks{

}
export interface Contact{
    name:string;
    email:string;
    mobile:number
}