function send() {
	if(logged_in) {
		let http = new XMLHttpRequest();
		
		// Setup to send a POST request with JSON to the API
		http.open("POST", "https://cqapi.sjedev.repl.co/api/data", true);
		http.setRequestHeader('Content-Type', 'application/json');

		// Compile a save code
		// Pad start with leading zeros if necessary
		let save_code_sent = String(coins).padStart(4, "0"); // Coins
		save_code_sent += String(wood).padStart(2, "0"); // Wood
		save_code_sent += String(stone).padStart(2, "0"); // Stone
		save_code_sent += String(seeds_1).padStart(2, "0"); // Seeds
		save_code_sent += String(crops_1).padStart(2, "0"); // Produce

		// Send the save code (in an object) to the web server in the payload of a HTTP POST request
		http.send(JSON.stringify({
			savecode: save_code_sent,
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