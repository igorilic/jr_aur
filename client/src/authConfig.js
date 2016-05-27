var configForDevelopment = {

	// Our Node API is being served from localhost:3001
	  baseUrl: 'http://joca/mvcauth',   //localhost:4430
	  // The API specifies that new users register at the POST /users enpoint
	  signupUrl: 'users',
	  // Logins happen at the POST /sessions/create endpoint
	  loginUrl: 'Account/LoginToken',
	  // The API serves its tokens with a key of id_token which differs from
	  // aurelia-auth's standard
	  tokenName: 'id_token',
	  // Once logged in, we want to redirect the user to the welcome view
	  loginRedirect: '#/index',

		profileUrl: 'api/Radnik/Me',   // '/auth/me',

	providers: {
		google: {
			clientId: '239531826023-ibk10mb9p7ull54j55a61og5lvnjrff6.apps.googleusercontent.com',
			state: function(){
                var val = ((Date.now() + Math.random()) * Math.random()).toString().replace(".", "");
                return encodeURIComponent(val);

            }
		}
		,
		linkedin:{
			clientId:'778mif8zyqbei7'
		},
		facebook:{
			clientId:'1452782111708498'
		}
	}
};

var configForProduction = {
	providers: {
		google: {
			clientId: '239531826023-3ludu3934rmcra3oqscc1gid3l9o497i.apps.googleusercontent.com'
		}
		,
		linkedin:{
			clientId:'7561959vdub4x1'
		},
		facebook:{
			clientId:'1653908914832509'
		}

	}
};
var config ;
// if (window.location.hostname==='localhost') {
// 	config = configForDevelopment;
// }
// else{
// 	config = configForProduction;
// }
config = configForDevelopment;

export default config;
