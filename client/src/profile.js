import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
@inject(AuthService )

export class Profile{
	constructor(auth){
		this.auth = auth;
		this.profile = null;
	};
	activate(){
		return this.auth.getMe()
		.then(data=>{
			var claims = [];
			var profileObject = {
			Ime:null,
			Prezime: null,
			picture: null
		};

			if(!Array.prototype.find)
				alert("Nije definisan find metod!");
			data.forEach(item => { claims.push({ Type: item.Type , Value: item.Value}) });
			var nameClaim = claims.find((element,index,array) => {
				console.log(element.Type);
				console.log(element.Type.length);
				 return String(element.Type ).substring(element.Type.length,element.Type.length-9 ) == 'givenname'});
			if(nameClaim)
				 profileObject.Ime = nameClaim.Value;
			//this.profile.Ime =claims.find((element,index,array) => { String(element.Type ).substring(element.Type.length,element.Type.length-4 ) == 'Name'}).Value;
			var surnameClaim = claims.find((element,index,array) => {
				return String(element.Type ).substring(element.Type.length,element.Type.length-7 ) == 'surname'});
			if(surnameClaim)
				profileObject.Prezime = surnameClaim.Value;

			this.profile = profileObject;

			//this.profile.Prezime =claims.find((element,index,array) => { String(element.Type ).substring(element.Type.length,element.Type.length-7 ) == 'Surname'}).Value;
		});
	}

	heading = 'Profil';

	// link(provider){
	// 	return this.auth.authenticate(provider, true, null)
	// 	/*.then((response)=>{
	// 		console.log("auth response " + response);
	// 		return this.auth.getMe();
	// 	})*/
	// 	.then(()=> this.auth.getMe())
	// 	.then(data=>{
	// 		this.profile = data;
	// 	});;
	// }
	// unlink(provider){
	// 	return this.auth.unlink(provider)
	// 	/*.then((response)=>{
	// 		console.log("auth response " + response);
	// 		return this.auth.getMe();
	// 	})*/
	// 	.then(()=> this.auth.getMe())
	// 	.then(data=>{
	// 		this.profile = data;
	// 	});;
	// }
	email='';
	password='';

}
