import {Validation,ensure} from 'aurelia-validation';
import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {SmartCardAuth} from './smartCardAuth';
// import {MaterialValidationViewStrategy} from './myViewStrategy';

@inject(AuthService , SmartCardAuth,Validation)
export class Login{


  //@ensure(function(it){ it.isNotEmpty().isEmail() })

	constructor(auth,smartCardAuth,validation){
		this.auth = auth;
		this.smartCardAuth = smartCardAuth;
		//this.validation = validation.on(this);
		this.validation = validation.on(this)
		.ensure('email').isNotEmpty().containsOnlyDigits().hasLengthBetween(4,6)
		.ensure('password').isNotEmpty().containsOnlyAlphanumerics().hasLengthBetween(4,6)
		// config => {
		// 		config.useViewStrategy(viewStrategyInstance);
		// 	});

			// .ensure('email')
			// 	.isNotEmpty()
			// 	.hasMinLength(4);

	};

	cardAuthenticate = false;
	cardError = true;

	heading = 'Login';

	//@ensure(function(it){ it.isNotEmpty().hasLengthBetween(4,6) })
	email='';

	//@ensure(function(it){ it.isNotEmpty().hasLengthBetween(4,10) })
	password='';

	//@ensure(function(it){ it.isNotEmpty().hasLengthBetween(4,10) })
	pinCodeIn = '';

	pinCode = '';
	userName = '';
	cardNumber = '';
	badPin = false;

	login(){
		this.validation.validate().then( () => {
		var creds = "grant_type=password&userName=" + this.email + "&password=" + this.password;
		if(this.cardAuthenticate){
			if( this.pinCode !== this.pinCodeIn){
				this.badPin = true;
				return;
			}
			creds = "grant_type=password&userName=" + this.cardNumber + "&password=" + "XXXXX";
		}
		//return this.auth.login(this.email, this.password)
    return this.auth.login(creds)
		.then(response=>{
			console.log("**** Uspesna prijava! " + response);
		})
		.catch(err=>{
			console.log("**** Neuspesna prijava!");
		});
	}).catch(()=>{
		alert("Unesite tacne podatke!");
	});
	}

	PinChange(){
		if( this.badPin )
			this.badPin = false;
	}

	authenticate(name){
		return this.auth.authenticate(name, false, null)
		.then((response)=>{
			console.log("auth response " + response);
		});

	}

	activate(){
		this.cardError = this.smartCardAuth.cardError;
		if(this.cardError === true ){
			alert("Postoji problem sa citacem kartice! Prijava se nastavlja unosom imena i lozinke. ");
			return;
		}

		this.smartCardAuth.SelectCard()
		.done((data) => {
						console.log ('Uspesno uvodjenje SelectCard-a');
						if(data === false){
							this.cardInserted = false;
							this.cardRemoved = true;
							this.cardError = false;
							this.cardAuthenticate = false;
							return;
						}
						this.cardInserted = true;
						this.cardRemoved = false;
						this.cardError = false;

						this.cardAuthenticate = true;
						// preuzmi podatke sa kartice
						this.smartCardAuth.GetCardData().done((cardData)=>{
						if( cardData !== null ){
							this.pinCode = cardData.PIN;
							this.cardNumber = cardData.CardNumber;
							this.userName = cardData.Name;
						}
						else{
							this.cardAuthenticate = false;
							alert("Neuspesno ucitavanje podataka sa kartice! Prijava se nastavlja unosom imena i lozinke. ");
							return;
						}
					}).fail((err)=>{
						this.cardAuthenticate = false;
						alert("Neuspesno ucitavanje podataka sa kartice! Prijava se nastavlja unosom imena i lozinke. ");
						return;
					});
						// if(data === true)
						// 	return true;
			}).fail(function (error) {
					this.cardError = true;
					console.log('Neuspesno uvodjenje SelectCard-a. Greska: ' + error);
		});
	}
}
