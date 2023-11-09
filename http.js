function send() {
	if(logged_in) {
		let http = new XMLHttpRequest();
		
		// Setup to send a POST request with JSON to the API
		http.open("POST", "https://cqapi.sjedev.repl.co/api/data", true);
		http.setRequestHeader('Content-Type', 'application/json');

		// For the purposes of testing - send a custom message
		let msg;
		msg = window.prompt("Your message is");

		// Send the contents (in an object) to the web server in the payload of a HTTP POST request
		http.send(JSON.stringify({
			savecode: msg,
			username: replit_user.id
		}));
	}
}

function retrieve() {
	// Use a HTTP GET request to get the game code
	let api_url = "https://cqapi.sjedev.repl.co/api/retrieve/" + replit_user.id;
	fetch(api_url)
		.then(response => response.json())
		.then(save_code_retrieved => {
			// Get data
			console.log(save_code_retrieved.savecode);
		})
		.catch(error => {
			// Throws errors accordingly
			console.error(error);
		});
}