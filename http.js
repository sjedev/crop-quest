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

		// Add tiles from the farm
		for (p = 0; p < level["farm"].height; p++) {
			// Iterate through tiles on the x-axis
			for (q = 0; q < level["farm"].width; q++) {
				save_code_sent += String(level["farm"].tiles[p][q]).padStart(3, "0"); // Farm tile
			}
		}

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
			// Update client-side data
			coins = Number(save_code_retrieved.savecode.substr(0,4)); // Coins
			wood = Number(save_code_retrieved.savecode.substr(4,2)); // Wood
			stone = Number(save_code_retrieved.savecode.substr(6,2)); // Stone
			seeds_1 = Number(save_code_retrieved.savecode.substr(8,2)); // Seeds
			crops_1 = Number(save_code_retrieved.savecode.substr(10,2)); // Crops

			let save_code_tiles = save_code_retrieved.savecode.substr(12); // Separate tiles from rest of code
			console.log(save_code_tiles);
			let save_code_tiles_id = new Array; // Array for separated tiles

			// Push each tile ID from save code into an array
			for (let i = 0; i < save_code_tiles.length; i += 3) {
				save_code_tiles_id.push(Number(save_code_tiles.substr(i, 3)));
			}

			console.log(save_code_tiles_id)
			
			// Set the farm tiles to the save data
			for (let p = 0; p < level["farm"].height; p++) {
				for (let q = 0; q < level["farm"].width; q++) {
					level["farm"].tiles[p][q] = save_code_tiles_id[(p * 24) + q];
				}
			}

			// Update farm map
			push_tiles("farm");
		})
		.catch(error => {
			// Throws errors accordingly
			console.error(error);
		});
}